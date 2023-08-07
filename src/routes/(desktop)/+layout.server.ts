import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (({ request }) => {
  const userAgent = request.headers.get("user-agent") ?? "";
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
  if (isMobile) {
    throw redirect(307, "/m");
  }
}) satisfies LayoutServerLoad;
