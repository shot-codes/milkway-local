<script lang="ts">
  import { tweened } from "svelte/motion";
  import { activePlanet, zoomedIn } from "$lib/stores";
  import type { Brand } from "$lib/utils";

  export let link = "";
  export let brand: Brand;

  const opacity = tweened(0, { duration: 2000 });

  const setOpacity = (newValue: number, delay: number) => {
    setTimeout(() => {
      opacity.set(newValue);
    }, delay);
  };

  $: {
    if ($activePlanet == brand) {
      setOpacity(1, 0);
    }
    if (!$zoomedIn) {
      setOpacity(0, 0);
    }
  }
</script>

<div
  id="root"
  style:--opacity={$opacity}
  class="space-y-32 absolute w-[800px] lg:w-[1200px] flex flex-col items-center"
>
  <div class="text-center space-y-8">
    <div class="text-sm">
      <slot name="title" />
    </div>
    <div class="text-3xl">
      <slot name="description" />
    </div>
  </div>
  <div class="bg-[#0b0a0c]/80 rounded-3xl p-24 flex space-x-24">
    <div>
      <slot name="image" />
    </div>
    <div class="flex-1 space-y-16">
      <slot name="content" />
      {#if link}
        <a
          href={link}
          rel="noreferrer"
          target="_blank"
          class="flex items-center space-x-4 pointer-events-auto p-1 px-12 rounded-full border text-sm border-white max-w-fit"
        >
          <span>Check them out</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="currentColor"
            class="w-10 h-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </a>
      {/if}
    </div>
  </div>
</div>

<style>
  #root {
    opacity: var(--opacity);
  }
</style>
