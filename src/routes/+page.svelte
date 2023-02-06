<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "../lib/components/Scene.svelte";
  import { useProgress } from "@threlte/extras";
  import { tweened } from "svelte/motion";
  import { fade } from "svelte/transition";

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

<!-- Loading page -->
{#if $tweenedProgress < 1}
  <div
    transition:fade={{
      duration: 2000,
    }}
    class="bg-black pointer-events-none flex absolute z-50 text-white justify-center items-center text-xl h-full w-full"
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
