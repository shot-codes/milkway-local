

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.37766d95.js","_app/immutable/chunks/scheduler.bea104e2.js","_app/immutable/chunks/index.520d9713.js","_app/immutable/chunks/singletons.a723794f.js","_app/immutable/chunks/index.b6975e4a.js"];
export const stylesheets = [];
export const fonts = [];
