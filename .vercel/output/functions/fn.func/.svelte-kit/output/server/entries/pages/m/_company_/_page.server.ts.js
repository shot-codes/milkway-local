import { e as error } from "../../../../chunks/index.js";
import { g as getClientInstance } from "../../../../chunks/prisma.js";
const prismaClient = getClientInstance();
const load = async ({ params }) => {
  try {
    const planet = await prismaClient.planet.findUnique({
      where: {
        id: parseInt(params.company)
      },
      include: {
        moons: true
      }
    });
    if (planet != null) {
      return planet;
    } else {
      throw error(500, "No planet found?");
    }
  } catch (err) {
    console.error(err);
    throw error(500, "Error fetching company.");
  }
};
export {
  load
};
