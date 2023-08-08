import * as server from '../entries/pages/m/_company_/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/m/_company_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/m/[company]/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.5d544167.js","_app/immutable/chunks/scheduler.bea104e2.js","_app/immutable/chunks/each.3d878967.js","_app/immutable/chunks/index.520d9713.js"];
export const stylesheets = [];
export const fonts = [];
