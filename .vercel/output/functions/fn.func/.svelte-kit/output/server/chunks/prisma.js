import { PrismaClient } from "@prisma/client";
let clientInstance;
const createInstance = () => {
  return new PrismaClient();
};
const getClientInstance = () => {
  if (!clientInstance) {
    clientInstance = createInstance();
  }
  return clientInstance;
};
export {
  getClientInstance as g
};
