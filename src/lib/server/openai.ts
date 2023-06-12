import { OPENAI_API_KEY } from "$env/static/private";
import { Configuration, OpenAIApi } from "openai";

let clientInstance: OpenAIApi;

const createInstance = () => {
  const config = new Configuration({
    apiKey: OPENAI_API_KEY,
  });

  return new OpenAIApi(config);
};

export const getClientInstance = () => {
  if (!clientInstance) {
    clientInstance = createInstance();
  }
  return clientInstance;
};
