<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h1 class="text-xl mb-2">{data.title}</h1>

<p>{data.content}</p>

<div class="flex flex-col mt-6">
  {#each data.moons as moon}
    <a href="/m/{data.id}/{moon.id}">{moon.title}</a>
  {/each}
</div>
