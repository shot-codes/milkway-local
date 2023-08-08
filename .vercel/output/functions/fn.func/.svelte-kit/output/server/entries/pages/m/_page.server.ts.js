import { d as dev } from "../../../chunks/environment.js";
import { e as error } from "../../../chunks/index.js";
import { g as getClientInstance } from "../../../chunks/prisma.js";
const prismaClient = getClientInstance();
const load = async () => {
  try {
    const system = await prismaClient.system.findMany({
      where: {
        name: dev ? "Solar System" : "Solar System"
      },
      include: {
        planets: true
      }
    });
    return {
      planets: system[0].planets
    };
  } catch (err) {
    console.error(err);
    throw error(500, "Error fetching solar system.");
  }
};
export {
  load
};
