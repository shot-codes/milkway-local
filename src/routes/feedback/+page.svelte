<script lang="ts">
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";

  export let form: ActionData;
</script>

<div class="h-full flex flex-col items-center justify-center">
  <h1 class="mx-auto text-2xl mb-3">Feedback and Ideas</h1>

  <form
    method="POST"
    use:enhance
    enctype="multipart/form/data"
    class="flex flex-col w-96 bg-neutral-800 p-6 rounded space-y-6"
  >
    <label class="flex flex-col">
      Name
      <input name="name" type="text" class="bg-neutral-900 rounded mt-1" />
    </label>
    <label class="flex flex-col">
      Suggestion
      <textarea name="suggestion" class="bg-neutral-900 rounded mt-1" />
    </label>
    <label class="flex flex-col">
      Image
      <input
        name="image"
        accept="image/png, image/jpeg"
        type="file"
        class="bg-neutral-900 rounded mt-1"
      />
    </label>
    <button class="border border-neutral-600 rounded p-2">Send</button>
  </form>

  <div class="h-16 pt-4">
    {#if form?.success}
      <p class="text-white">Suggestion submitted</p>
    {/if}
    {#if form?.success == false}
      <p class="text-white">{form?.message}</p>
    {/if}
  </div>
</div>
