<script lang="ts">
  import ChatChat from "./ChatChat.svelte";
  import CompletionChat from "./CompletionsChat.svelte";
</script>

<h1 class="my-3 text-center w-full">Experimental Chat Interfaces</h1>
<div class="flex flex-col items-center h-full py-6 space-y-12 w-2/3 max-w-[600px] mx-auto">
  <ChatChat />
  <CompletionChat />
</div>
