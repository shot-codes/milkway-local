import { c as create_ssr_component, p as each, e as escape } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<h1 class="text-xl mb-2" data-svelte-h="svelte-7t8v92">Zibra Group</h1> <div class="flex flex-col">${each(data.planets, (planet) => {
    return `<a href="${"/m/" + escape(planet.id, true)}">${escape(planet.title)}</a>`;
  })}</div>`;
});
export {
  Page as default
};
