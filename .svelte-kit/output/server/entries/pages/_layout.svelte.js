import "clsx";
import { e as escape_html } from "../../chunks/escaping.js";
function PretendServerBanner($$renderer, $$props) {
  let { files = "src/lib/mock-server/" } = $$props;
  $$renderer.push(`<div class="pretend-banner svelte-qtyk18" role="note">Pretend server: the code in <code class="svelte-qtyk18">${escape_html(files)}</code> would run on a server. Here it runs inside this page, so nothing is sent
  anywhere and anyone who opens the page's code can read it. Press Refresh in the preview to start again from the starting data.</div>`);
}
function _layout($$renderer, $$props) {
  let { children } = $$props;
  PretendServerBanner($$renderer, { files: "src/lib/mock-server/" });
  $$renderer.push(`<!----> <header class="svelte-12qhfyh"><h1>Recipe Box</h1> <nav class="svelte-12qhfyh"><a href="/" class="svelte-12qhfyh">Home</a> <a href="/recipes" class="svelte-12qhfyh">Recipes</a> <a href="/api-tester" class="svelte-12qhfyh">JSON feed</a></nav></header> <main class="svelte-12qhfyh">`);
  children($$renderer);
  $$renderer.push(`<!----></main>`);
}
export {
  _layout as default
};
