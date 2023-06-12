import { PINECONE_API_KEY, PINECONE_ENVIRONMENT } from "$env/static/private";
import { PineconeClient } from "@pinecone-database/pinecone";

let clientInstance: PineconeClient;

const createInstance = async () => {
  const client = new PineconeClient();
  await client.init({
    environment: PINECONE_ENVIRONMENT,
    apiKey: PINECONE_API_KEY,
  });
  return client;
};

export const getClientInstance = async () => {
  if (!clientInstance) {
    clientInstance = await createInstance();
  }
  return clientInstance;
};
