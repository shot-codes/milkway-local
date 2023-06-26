import type { RequestHandler } from "./$types";
import { getClientInstance as getOpenAIClient } from "$lib/server/openai";
import { getClientInstance as getPineconeClient } from "$lib/server/pinecone";
import type { ScoredVector } from "@pinecone-database/pinecone";
import { json, error } from "@sveltejs/kit";

const openaiClient = getOpenAIClient();
const pineconeClient = await getPineconeClient();
const index = pineconeClient.Index("milkyway");

export const POST = (async ({ request }) => {
  try {
    const data = await request.json();
    const query = data.msg;

    const xq = await openaiClient.createEmbedding({
      model: "text-embedding-ada-002",
      input: String(query),
    });

    const res = await index.query({
      queryRequest: {
        topK: 1,
        vector: xq["data"]["data"][0]["embedding"],
        includeValues: false,
        includeMetadata: true,
      },
    });

    const contexts = res.matches?.map((x: ScoredVector) => {
      if (x.metadata && "text" in x.metadata) {
        return x.metadata.text;
      }
    });

    const limit = 3750;
    let prompt = "";

    // If confidence is high, add context.
    if (res.matches?.[0].score && res.matches[0].score > 0.75) {
      const prompt_start = "Answer the question based on the context below.\n\n" + "Context:\n";
      const prompt_end = `\n\nQuestion: ${query}\nAnswer:`;
      if (contexts) {
        for (let i = 0; i < contexts.length; i++) {
          if (contexts.slice(0, i).join("\n\n---\n\n").length >= limit) {
            prompt = prompt_start + contexts.slice(0, i - 1).join("\n\n---\n\n") + prompt_end;
            break;
          } else if (i == contexts.length - 1) {
            prompt = prompt_start + contexts.join("\n\n---\n\n") + prompt_end;
          }
        }
      }
    } else {
      prompt =
        "You are a chatbot assistant for a website. You're goal is to answer questions about the website experience. Answer the following accordingly:\n" +
        String(query);
    }

    const completion = await openaiClient.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 250,
    });
    return json(completion.data.choices[0].text);

    // TODO: send potential errors to client.
  } catch (err) {
    console.error(err);
    throw error(503, {
      message: "Error proccessing request.",
    });
  }
}) satisfies RequestHandler;
