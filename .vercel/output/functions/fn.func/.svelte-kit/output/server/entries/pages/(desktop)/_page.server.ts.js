import { g as getClientInstance } from "../../../chunks/prisma.js";
import { e as error } from "../../../chunks/index.js";
import { d as dev } from "../../../chunks/environment.js";
const prismaClient = getClientInstance();
const load = async () => {
  try {
    const system = await prismaClient.system.findMany({
      where: {
        name: dev ? "Solar System" : "Solar System"
      },
      include: {
        planets: {
          include: {
            moons: true
          }
        }
      }
    });
    return system[0];
  } catch (err) {
    console.error(err);
    throw error(500, "Error fetching solar system.");
  }
};
export {
  load
};
