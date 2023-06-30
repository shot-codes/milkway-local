<script lang="ts">
  import { zoomedIn } from "$lib/stores";
  import { zoomOut } from "$lib/utils";
</script>

{#if $zoomedIn}
  <button class="fixed top-7 left-10 rounded-full p-2 ring ring-white z-30" on:click={zoomOut}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1"
      stroke="currentColor"
      class="w-4 h-4"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      />
    </svg>
  </button>
{/if}
