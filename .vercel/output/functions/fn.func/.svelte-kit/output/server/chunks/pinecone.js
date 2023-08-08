import { Configuration, OpenAIApi } from "openai";
import { PineconeClient } from "@pinecone-database/pinecone";
const OPENAI_API_KEY = "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";
const PINECONE_API_KEY = "19992581-35e9-4af2-af93-7914d800a6dd";
const PINECONE_ENVIRONMENT = "asia-northeast1-gcp";
let clientInstance$1;
const createInstance$1 = () => {
  const config = new Configuration({
    apiKey: OPENAI_API_KEY
  });
  return new OpenAIApi(config);
};
const getClientInstance$1 = () => {
  if (!clientInstance$1) {
    clientInstance$1 = createInstance$1();
  }
  return clientInstance$1;
};
let clientInstance;
const createInstance = async () => {
  const client = new PineconeClient();
  await client.init({
    environment: PINECONE_ENVIRONMENT,
    apiKey: PINECONE_API_KEY
  });
  return client;
};
const getClientInstance = async () => {
  if (!clientInstance) {
    clientInstance = await createInstance();
  }
  return clientInstance;
};
export {
  getClientInstance as a,
  getClientInstance$1 as g
};
