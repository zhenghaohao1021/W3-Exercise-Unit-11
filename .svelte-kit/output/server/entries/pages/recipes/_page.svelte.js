import { a as attr } from "../../../chunks/attributes.js";
/* empty css                                                     */
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let title = "";
    let minutes = "";
    $$renderer2.push(`<h2>Recipes</h2> `);
    {
      $$renderer2.push(`<!--[1--><p>Loading...</p>`);
    }
    $$renderer2.push(`<!--]--> <h3>Add a recipe</h3> <form id="add-form"><input name="title" placeholder="Title"${attr("value", title)}/> <input name="minutes" type="number" placeholder="Minutes"${attr("value", minutes)}/> <button>Add</button></form> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
