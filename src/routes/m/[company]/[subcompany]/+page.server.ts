import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { getClientInstance } from "$lib/server/prisma";

const prismaClient = getClientInstance();

export const load = (async ({ params }) => {
  try {
    const moon = await prismaClient.moon.findUnique({
      where: {
        id: parseInt(params.subcompany),
      },
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
}) satisfies PageServerLoad;
