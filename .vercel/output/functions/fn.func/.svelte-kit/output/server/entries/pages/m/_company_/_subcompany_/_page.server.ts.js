import { e as error } from "../../../../../chunks/index.js";
import { g as getClientInstance } from "../../../../../chunks/prisma.js";
const prismaClient = getClientInstance();
const load = async ({ params }) => {
  try {
    const moon = await prismaClient.moon.findUnique({
      where: {
        id: parseInt(params.subcompany)
      }
    });
    if (moon != null) {
      return moon;
    } else {
      throw error(500, "Couldn't find company?");
    }
  } catch (err) {
    console.error(err);
    throw error(500, "Error fetching company.");
  }
};
export {
  load
};
