

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.OsL7NPlV.js","_app/immutable/chunks/1XW4517Q.js","_app/immutable/chunks/BFunsuKn.js"];
export const stylesheets = ["_app/immutable/assets/2.DlYK6Ujm.css"];
export const fonts = [];
