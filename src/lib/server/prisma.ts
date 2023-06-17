import { PrismaClient } from "@prisma/client";

let clientInstance: PrismaClient;

const createInstance = () => {
  return new PrismaClient();
};

export const getClientInstance = () => {
  if (!clientInstance) {
    clientInstance = createInstance();
  }
  return clientInstance;
};
