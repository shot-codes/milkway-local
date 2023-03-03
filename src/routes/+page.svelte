<script lang="ts">
  import { dev } from "$app/environment";
  import { Canvas } from "@threlte/core";
  import { useProgress } from "@threlte/extras";
  import { tweened } from "svelte/motion";
  import { fade, slide } from "svelte/transition";
  import Scene from "$lib/components/Scene.svelte";
  import ZoomOutButton from "$lib/components/ZoomOutButton.svelte";
  import { zoomedIn, pageContent } from "$lib/stores";
  import Grain from "$lib/components/Grain.svelte";

  const { progress } = useProgress();

  const tweenedProgress = tweened($progress, {
    duration: 800,
  });
  $: tweenedProgress.set($progress);
</script>

<!-- Threlte content -->
<div class="w-full h-full absolute">
  <Canvas>
    <Scene />
  </Canvas>
</div>

<!-- Planet content -->
{#if $zoomedIn}
  <div class="fixed w-full h-full overflow-scroll flex flex-col-reverse">
    <div
      class="m-10 bg-black p-6 text-white rounded-lg bg-opacity-20 backdrop-blur-md"
      in:slide={{
        duration: 1000,
        delay: 2000,
      }}
      out:slide={{
        duration: 1000,
      }}
    >
      <h1 class="font-bold text-lg">{$pageContent.title}</h1>
      {$pageContent.content}
    </div>
  </div>
{/if}

<!-- Loading page -->
<!-- tweened progress never reaches 1 -->
{#if $tweenedProgress < 1 && false}
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

<ZoomOutButton />

<div class="z-50">
  <Grain />
</div>

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
