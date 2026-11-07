import "clsx";
function _page($$renderer) {
  $$renderer.push(`<h2>Welcome</h2> <p>Open the <a href="/recipes">recipe list</a>, or try the JSON feed at <a href="/api-tester">/api/recipes</a>.</p> <p class="hint svelte-1uha8ag">The pages in <code>src/routes/</code> are browser code. The files in <code>src/lib/mock-server/</code> are the pretend
  server: they are where you write today.</p>`);
}
export {
  _page as default
};
