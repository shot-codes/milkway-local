import type { Actions } from "./$types";
import { getClientInstance } from "$lib/server/prisma";

const prismaClient = getClientInstance();

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    // Handle name and text
    const name = data.get("name")?.valueOf() as string;
    const text = data.get("suggestion")?.valueOf() as string;
    if (!text || text.length == 0) {
      return { success: false, message: "Suggestion cannot be empty." };
    }

    // Handle image data
    const file = data.get("image")?.valueOf() as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const image = buffer.toString("base64");

    try {
      await prismaClient.suggestion.create({
        data: {
          name,
          text,
          image,
        },
      });
    } catch (error) {
      console.error(error);
      return { success: false };
    }
    return { success: true };
  },
} satisfies Actions;
