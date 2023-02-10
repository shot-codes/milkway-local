<script lang="ts">
  import { zoomedIn } from "$lib/stores";
  import { zoomOut } from "$lib/utils";
</script>

{#if $zoomedIn}
  <button
    class="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-6 rounded-full p-2 ring-1 ring-white ring-opacity-50 z-30"
    on:click={zoomOut}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"
      ><path fill="white" d="M16 22L6 12l1.4-1.4l8.6 8.6l8.6-8.6L26 12z" /></svg
    >
  </button>
{/if}
