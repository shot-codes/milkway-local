import type { PageServerLoad } from "./$types";
import { getClientInstance } from "$lib/server/prisma";

const prismaClient = getClientInstance();

export const load = (async () => {
  const suggestions = await prismaClient.suggestion.findMany();
  console.log(suggestions);

  // suggestions.forEach((suggestion) => {})
  return {
    entries: {
      name: "test",
      feedback: "testerson",
    },
  };
}) satisfies PageServerLoad;
