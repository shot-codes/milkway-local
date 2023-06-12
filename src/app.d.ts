import type { PineconeClient } from "@pinecone-database/pinecone";
import type { OpenAIApi } from "openai";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      pinecone: PineconeClient;
      openai: OpenAIApi;
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
