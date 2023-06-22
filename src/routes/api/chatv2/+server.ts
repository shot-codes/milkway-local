import type { RequestHandler } from "./$types";
import { getClientInstance as getOpenAIClient } from "$lib/server/openai";
import { getClientInstance as getPineconeClient } from "$lib/server/pinecone";
import { json } from "@sveltejs/kit";

const openaiClient = getOpenAIClient();
const pineconeClient = await getPineconeClient();
const index = pineconeClient.index("milkyway");

export const POST = (async ({ request }) => {
  const data = await request.json();
  const query = data.msg;

  console.log(query);

  return json("Returned!");
}) satisfies RequestHandler;
