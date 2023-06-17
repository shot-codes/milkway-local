<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="p-6">
  <h1>Feedback Backlog</h1>
  <pre>{JSON.stringify(data)}</pre>
  <!-- <img src={`data:image/png;base64,${data.image}`} /> -->
</div>
