<script lang="ts">
  let message: string;
  let downloadString = "";
  let chatContainer: HTMLDivElement;
  let input: HTMLInputElement;

  const sendMessage = async (msg: string) => {
    // Create and add message to DOM
    const sentElement = document.createElement("p");
    sentElement.classList.add(
      "mb-2",
      "p-2",
      "bg-blue-500",
      "max-w-sm",
      "ml-auto",
      "rounded-lg",
      "text-xs"
    );
    sentElement.textContent = msg;
    chatContainer.appendChild(sentElement);
    message = "";

    // Add to download file
    downloadString += "User:\n" + msg + "\n\n";

    // Create pending response element
    const waitingElement = document.createElement("p");
    waitingElement.classList.add(
      "mb-2",
      "p-2",
      "bg-neutral-500",
      "max-w-sm",
      "mr-auto",
      "rounded-lg",
      "text-xs"
    );
    waitingElement.textContent = "...";
    chatContainer.appendChild(waitingElement);

    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ msg }),
      headers: {
        "content-type": "application/json",
      },
    });
    const answer = await response.json();
    waitingElement.textContent = answer;

    // Add to download string
    downloadString += "Chat Bot:\n" + answer + "\n\n";

    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;

    input.focus();
  };

  // Chat log downloading
  const download = (filename: string, text: string) => {
    var element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
</script>

<div class="flex flex-col space-y-2 w-full items-center">
  <h2 class="text-sm">Completions API</h2>
  <div class="text-xs p-2 space-y-2">
    <p>
      This is a chatbot built with the OpenAI Completions API and manually copied company content.
      It is currently aware of Lactobio, Mindfuture, Zibra Partner Equity, Confinze, ZibraSport,
      Zybersafe, People Ventures, M2Call, NGUVU, Quinta da Várzea, Byon8, Inniti, MXNEY, Next11,
      Radiobotics, Sani Nudge, Son of a Tailer, Spiio, Tiimo, and Motus. You can try asking it
      questions about those and see how it responds.
    </p>
    <p>
      Since this is using the Completions API and not the Chat API, it is not tuned to dialogues.
      This is mitagated through some prompt enrichment I have added but certainly isn't perfect. You
      might get some very strange answers from it 😂.
    </p>
    <p>A chatbot built with the ChatAPI is on the way!</p>
  </div>

  <div class="flex flex-col bg-neutral-600 w-full p-2 rounded">
    <div bind:this={chatContainer} class="flex flex-col pr-10 h-[200px] overflow-scroll" />

    <form on:submit|preventDefault={() => sendMessage(message)} class="flex w-full mt-2">
      <label class="flex grow">
        <input
          bind:this={input}
          bind:value={message}
          type="text"
          class="bg-neutral-800 rounded grow mr-2 text-xs px-2"
        />
      </label>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          class="text-neutral-300"
          ><g fill="none"
            ><path
              d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"
            /><path
              fill="currentColor"
              d="M20.25 3.532a1 1 0 0 1 1.183 1.329l-6 15.5a1 1 0 0 1-1.624.362l-3.382-3.235l-1.203 1.202c-.636.636-1.724.186-1.724-.714v-3.288L2.309 9.723a1 1 0 0 1 .442-1.691l17.5-4.5Zm-2.114 4.305l-7.998 6.607l3.97 3.798l4.028-10.405Zm-1.578-1.29L4.991 9.52l3.692 3.53l7.875-6.505Z"
            /></g
          ></svg
        >
      </button>
    </form>
  </div>

  <button
    class="bg-neutral-600 rounded p-2 text-sm"
    on:click={() => {
      download("log.txt", downloadString);
    }}>Download Chat</button
  >
</div>
