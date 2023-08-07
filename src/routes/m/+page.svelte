<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h1 class="text-xl mb-2">Zibra Group</h1>

<div class="flex flex-col">
  {#each data.planets as planet}
    <a href="/m/{planet.id}">{planet.title}</a>
  {/each}
</div>
