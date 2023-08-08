import { c as create_ssr_component, e as escape, p as each } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<h1 class="text-xl mb-2">${escape(data.title)}</h1> <p>${escape(data.content)}</p> <div class="flex flex-col mt-6">${each(data.moons, (moon) => {
    return `<a href="${"/m/" + escape(data.id, true) + "/" + escape(moon.id, true)}">${escape(moon.title)}</a>`;
  })}</div>`;
});
export {
  Page as default
};
