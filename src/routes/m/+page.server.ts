import type { PageServerLoad } from "./$types";
import { dev } from "$app/environment";
import { error } from "@sveltejs/kit";
import { getClientInstance } from "$lib/server/prisma";

const prismaClient = getClientInstance();

export const load = (async () => {
  try {
    const system = await prismaClient.system.findMany({
      where: {
        name: dev ? "Solar System" : "Solar System",
      },
      include: {
        planets: true,
      },
    });
    return {
      planets: system[0].planets,
    };
  } catch (err) {
    console.error(err);
    throw error(500, "Error fetching solar system.");
  }
}) satisfies PageServerLoad;
