

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/chat/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.9cad43bb.js","_app/immutable/chunks/scheduler.bea104e2.js","_app/immutable/chunks/index.520d9713.js"];
export const stylesheets = [];
export const fonts = [];
