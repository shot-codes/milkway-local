import type { RequestHandler } from "./$types";
import { getClientInstance as getOpenAIClient } from "$lib/server/openai";
import { getClientInstance as getPineconeClient } from "$lib/server/pinecone";
import type { ScoredVector } from "@pinecone-database/pinecone";
import { json } from "@sveltejs/kit";

const openaiClient = getOpenAIClient();
const pineconeClient = await getPineconeClient();
const index = pineconeClient.Index("milkyway");

export const POST = (async ({ request }) => {
  const data = await request.formData();
  const query = data.get("prompt");

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

  try {
    const completion = await openaiClient.createCompletion({
      model: "text-davinci-003",
      prompt,
    });
    console.log(completion.data.choices[0].text);
    return json(completion.data.choices[0].text);

    // TODO: send potential errors to client.
  } catch (error: unknown) {
    if (typeof error == "object" && error !== null && "response" in error) {
      if (
        typeof error.response == "object" &&
        error.response !== null &&
        "status" in error.response &&
        "data" in error.response
      ) {
        console.log(error.response.status);
        console.log(error.response.data);
      }
    } else if (typeof error == "object" && error !== null && "message" in error) {
      console.log(error.message);
    } else {
      console.log("Unknown error:\n");
      console.log(error);
    }
  }

  return json("test");
}) satisfies RequestHandler;
