

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.bf6c08b9.js","_app/immutable/chunks/scheduler.bea104e2.js","_app/immutable/chunks/index.520d9713.js"];
export const stylesheets = [];
export const fonts = [];
