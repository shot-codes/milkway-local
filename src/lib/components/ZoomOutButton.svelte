<script lang="ts">
  import { zoomedIn } from "$lib/stores";
  import { zoomOut } from "$lib/utils";
</script>

{#if $zoomedIn}
  <button
    class="absolute top-10 left-10 rounded-full p-2 ring ring-white z-50"
    on:click={zoomOut}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-12 h-12">
      <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>  
  </button>
{/if}
