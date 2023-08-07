<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  console.log(data);
</script>

<h1 class="text-xl mb-2">{data.title}</h1>

<p>{data.content}</p>
