

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/m/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.b8aa665f.js","_app/immutable/chunks/scheduler.bea104e2.js","_app/immutable/chunks/index.520d9713.js"];
export const stylesheets = ["_app/immutable/assets/2.37774921.css"];
export const fonts = ["_app/immutable/assets/space-grotesk-v15-latin-regular.4f228f32.woff2","_app/immutable/assets/space-grotesk-v15-latin-regular.beec733b.woff","_app/immutable/assets/space-grotesk-v15-latin-700.751851e7.woff2","_app/immutable/assets/space-grotesk-v15-latin-700.3a524390.woff"];
