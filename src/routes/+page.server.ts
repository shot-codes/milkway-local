import type { PageServerLoad } from "./$types";
import { getClientInstance } from "$lib/server/prisma";
import { error } from "@sveltejs/kit";

const prismaClient = getClientInstance();

export const load = (async () => {
  try {
    const system = await prismaClient.system.findFirst({
      include: {
        planets: {
          include: {
            moons: true,
          },
        },
      },
    });
    return system;
  } catch (err) {
    console.error(err);
    throw error(500, "Error fetching solar system.");
  }
}) satisfies PageServerLoad;
