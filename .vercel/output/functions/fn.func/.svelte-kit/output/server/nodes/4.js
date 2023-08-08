import * as server from '../entries/pages/(desktop)/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(desktop)/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(desktop)/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.fe3065fc.js","_app/immutable/chunks/4.133a45dd.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/scheduler.bea104e2.js","_app/immutable/chunks/index.520d9713.js","_app/immutable/chunks/index.b6975e4a.js"];
export const stylesheets = ["_app/immutable/assets/4.dffa5a10.css"];
export const fonts = [];
