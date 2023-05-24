<script lang="ts">
  import { dev } from "$app/environment";
  import { Canvas } from "@threlte/core";
  import { useProgress } from "@threlte/extras";
  import { tweened } from "svelte/motion";
  import { fade } from "svelte/transition";
  import Scene from "$lib/components/Scene.svelte";
  import ZoomOutButton from "$lib/components/ZoomOutButton.svelte";
  import { onMount } from "svelte";
  // import Grain from "$lib/components/Grain.svelte";

  let audio: HTMLAudioElement;

  const { progress } = useProgress();
  let audioPlaying = false;

  const tweenedProgress = tweened($progress, {
    duration: 800,
  });
  $: tweenedProgress.set($progress);

  function toggleAudio() {
    audioPlaying = !audioPlaying;

    if (audioPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }
</script>

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
  class="fixed top-6 right-6 text-white z-50 p-3 rounded-full ring-2 ring-white cursor-pointer"
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
