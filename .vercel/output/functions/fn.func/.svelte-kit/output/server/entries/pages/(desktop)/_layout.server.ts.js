import { r as redirect } from "../../../chunks/index.js";
const load = ({ request }) => {
  const userAgent = request.headers.get("user-agent") ?? "";
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
  if (isMobile) {
    throw redirect(307, "/m");
  }
};
export {
  load
};
