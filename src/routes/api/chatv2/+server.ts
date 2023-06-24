import type { RequestHandler } from "./$types";
import { getClientInstance as getOpenAIClient } from "$lib/server/openai";
import { getClientInstance as getPineconeClient } from "$lib/server/pinecone";
import { error, json } from "@sveltejs/kit";
import type { ScoredVector } from "@pinecone-database/pinecone";

const openaiClient = getOpenAIClient();
const pineconeClient = await getPineconeClient();
const index = pineconeClient.Index("milkyway");

export const POST = (async ({ request }) => {
  const data = await request.json();
  const query = data.msg;

  try {
    const xq = await openaiClient.createEmbedding({
      model: "text-embedding-ada-002",
      input: String(query),
    });

    const limit = 3750;
    let systemPrompt = "";
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
        return String(x.metadata.text);
      }
    });

    if (res.matches?.[0].score && res.matches[0].score > 0.75) {
      const prompt_start = "Answer the question based on the context below.\n\n" + "Context:\n";
      const prompt_end = `\n\nQuestion: ${query}\nAnswer:`;
      if (contexts) {
        for (let i = 0; i < contexts.length; i++) {
          if (contexts.slice(0, i).join("\n\n---\n\n").length >= limit) {
            systemPrompt = prompt_start + contexts.slice(0, i - 1).join("\n\n---\n\n") + prompt_end;
            break;
          } else if (i == contexts.length - 1) {
            systemPrompt = prompt_start + contexts.join("\n\n---\n\n") + prompt_end;
          }
        }
      }
    } else {
      systemPrompt = "You are a helpful assitant for the ZibraGroup website.";
    }

    const completion = await openaiClient.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: query },
      ],
    });
    return json(completion.data.choices[0].message);
  } catch (err) {
    console.error(err);
    throw error(503, {
      message: "Error proccessing request.",
    });
  }
}) satisfies RequestHandler;
