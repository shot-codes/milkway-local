import type { PageServerLoad } from "./$types";
import { getClientInstance } from "$lib/server/prisma";
import { error } from "@sveltejs/kit";
import { dev } from "$app/environment";

const prismaClient = getClientInstance();

export const load = (async () => {
  try {
    const system = await prismaClient.system.findMany({
      where: {
        name: dev ? "dev" : "Solar System",
      },
      include: {
        planets: {
          include: {
            moons: true,
          },
        },
      },
    });
    return system[0];
  } catch (err) {
    console.error(err);
    throw error(500, "Error fetching solar system.");
  }
}) satisfies PageServerLoad;
