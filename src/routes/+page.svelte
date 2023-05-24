<script lang="ts">
  import { dev } from "$app/environment";
  import { Canvas } from "@threlte/core";
  import { useProgress } from "@threlte/extras";
  import { tweened } from "svelte/motion";
  import { fade } from "svelte/transition";
  import Scene from "$lib/components/Scene.svelte";
  import ZoomOutButton from "$lib/components/ZoomOutButton.svelte";
  // import Grain from "$lib/components/Grain.svelte";

  let audio: HTMLAudioElement;

  const { progress } = useProgress();
  let audioPlaying = false;

  const tweenedProgress = tweened($progress, {
    duration: 800,
  });
  $: tweenedProgress.set($progress);

  let showLoadingPage = true;

  function toggleAudio() {
    audioPlaying = !audioPlaying;

    if (audioPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  function toggleLoadingPage() {
    showLoadingPage = !showLoadingPage;
  }
</script>

{#if showLoadingPage && !dev}
  <div
    transition:fade={{ duration: 800 }}
    class="bg-black/90 fixed inset-0 z-50 flex items-center justify-center"
  >
    <div class="space-y-[10vh] text-center">
      <h1
        class="text-[80px] font-semibold bg-gradient-to-r from-[#2C2933] via-[#2C2933] to-[#605D66] bg-clip-text text-transparent leading-normal"
      >
        Velkommen til Zibra Group
      </h1>
      <div>Her er nogle tips til <span class="text-[#DE524E]">oplevelsen</span></div>
      <div class="grid gap-12 grid-cols-2 lg:grid-cols-4">
        <div
          class="flex flex-col items-center justify-center rounded-xl p-8 px-12 max-w-sm space-y-8 text-center bg-[#232227]/80"
        >
          <img src="/3.svg" alt="" class="w-12" />
          <div>Tilgå chatbotten i menuen i toppen</div>
        </div>
        <div
          class="flex flex-col items-center justify-center rounded-xl p-8 px-12 max-w-sm space-y-8 text-center bg-[#232227]/80"
        >
          <img src="/2.svg" alt="" class="w-12" />
          <div>Klik og hold med musen, på solsystemet for at trække det rundt</div>
        </div>
        <div
          class="flex flex-col items-center justify-center rounded-xl p-8 px-12 max-w-sm space-y-8 text-center bg-[#232227]/80"
        >
          <img src="/1.svg" alt="" class="w-12" />
          <div>Klik på en planet for at zoome ind på en virksomhed</div>
        </div>
        <div
          class="flex flex-col items-center justify-center rounded-xl p-8 px-12 max-w-sm space-y-8 text-center bg-[#232227]/80"
        >
          <img src="/4.svg" alt="" class="w-12" />
          <div>Klik på virksomhedens link, for at tilgå deres hjemmeside</div>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <button
          class="bg-[#DE524E] rounded-full text-black p-4 px-8 flex items-center space-x-4"
          on:click={toggleLoadingPage}
        >
          <div>Gå på opdagelse</div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- Loading page -->
<!-- tweened progress never reaches 1 -->
{#if $tweenedProgress < 1 && !dev}
  <div
    transition:fade={{
      duration: 2000,
    }}
    class="bg-black pointer-events-none flex absolute z-40 text-white justify-center items-center text-xl h-full w-full"
  >
    {#if $tweenedProgress < 1}
      <div
        transition:fade={{
          duration: 200,
        }}
        class="spinner"
      />
    {/if}
  </div>
{/if}

<audio bind:this={audio} loop>
  <source src="/ambience.mp3" type="audio/mpeg" />
</audio>

<button
  class="fixed top-6 right-6 text-white z-40 p-3 rounded-full ring-2 ring-white cursor-pointer"
  on:click={toggleAudio}
>
  {#if audioPlaying}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-8 h-8"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
      />
    </svg>
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-8 h-8"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
      />
    </svg>
  {/if}
</button>

<!-- Threlte content -->
<div class="w-full h-full absolute">
  <Canvas>
    <Scene />
  </Canvas>
</div>

<ZoomOutButton />

<!-- <div class="z-50">
  <Grain />
</div> -->
<style>
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  .spinner:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-top-color: #000;
    animation: spinner 0.6s linear infinite;
  }
</style>
