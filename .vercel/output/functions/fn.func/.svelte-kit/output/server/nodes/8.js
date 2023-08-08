import * as server from '../entries/pages/m/_company_/_subcompany_/_page.server.ts.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/m/_company_/_subcompany_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/m/[company]/[subcompany]/+page.server.ts";
export const imports = ["_app/immutable/nodes/8.9aa34d38.js","_app/immutable/chunks/scheduler.bea104e2.js","_app/immutable/chunks/index.520d9713.js"];
export const stylesheets = [];
export const fonts = [];
