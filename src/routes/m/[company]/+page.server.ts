import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { getClientInstance } from "$lib/server/prisma";

const prismaClient = getClientInstance();

export const load = (async ({ params }) => {
  try {
    const planet = await prismaClient.planet.findUnique({
      where: {
        id: parseInt(params.company),
      },
      include: {
        moons: true,
      },
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
}) satisfies PageServerLoad;
