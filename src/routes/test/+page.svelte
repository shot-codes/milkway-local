<script lang="ts">
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";

  export let form: ActionData;
</script>

<h1>Chat interface</h1>

<form method="POST" use:enhance>
  <label>
    Text
    <input name="prompt" type="text" class="bg-black" />
  </label>
  <button>Send</button>
</form>

{#if form?.success}
  <!-- this message is ephemeral; it exists because the page was rendered in
           response to a form submission. it will vanish if the user reloads -->
  <p class="text-white">Successfull completion: {form.text}</p>
{/if}
