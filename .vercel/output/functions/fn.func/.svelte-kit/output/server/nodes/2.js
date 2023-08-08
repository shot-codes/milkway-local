import * as universal from '../entries/pages/(desktop)/_layout.ts.js';
import * as server from '../entries/pages/(desktop)/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(desktop)/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/(desktop)/+layout.ts";
export { server };
export const server_id = "src/routes/(desktop)/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.e5d94373.js","_app/immutable/chunks/scheduler.bea104e2.js","_app/immutable/chunks/index.520d9713.js"];
export const stylesheets = ["_app/immutable/assets/2.37774921.css"];
export const fonts = ["_app/immutable/assets/space-grotesk-v15-latin-regular.4f228f32.woff2","_app/immutable/assets/space-grotesk-v15-latin-regular.beec733b.woff","_app/immutable/assets/space-grotesk-v15-latin-700.751851e7.woff2","_app/immutable/assets/space-grotesk-v15-latin-700.3a524390.woff"];
