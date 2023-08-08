import { c as create_ssr_component, e as escape } from "../../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  console.log(data);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<h1 class="text-xl mb-2">${escape(data.title)}</h1> <p>${escape(data.content)}</p>`;
});
export {
  Page as default
};
