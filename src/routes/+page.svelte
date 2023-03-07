<script lang="ts">
  import { dev } from "$app/environment";
  import { PerspectiveCamera, OrbitControls, Canvas, T } from "@threlte/core";
  import { useProgress } from "@threlte/extras";
  import { tweened } from "svelte/motion";
  import { fade, slide } from "svelte/transition";
  import Scene from "$lib/components/Scene.svelte";
  import ZoomOutButton from "$lib/components/ZoomOutButton.svelte";
  import { zoomedIn, activePlanet, ogCameraPosition, ogTargetPosition } from "$lib/stores";

  import MindFuture from "$lib/components/planets/MindFuture.svelte";
  import BlueLobster from "$lib/components/planets/BlueLobster.svelte";
  import BornFiber from "$lib/components/planets/BornFiber.svelte";
  import Morpheus from "$lib/components/planets/Morpheus.svelte";
  import Ocrevus from "$lib/components/planets/Ocrevus.svelte";
  import Paladin from "$lib/components/planets/Paladin.svelte";
  import Pleo from "$lib/components/planets/Pleo.svelte";
  import ZibraSport from "$lib/components/planets/ZibraSport.svelte";
  import ZibraTech from "$lib/components/planets/ZibraTech.svelte";
  // import Grain from "$lib/components/Grain.svelte";

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
    <div class="fixed h-screen w-screen text-white gradient-bg"
      in:fade={{
        duration: 400,
        delay: 800,
      }}
      out:fade={{
        duration: 600,
      }}
    >
      <div class="fixed top-6 inset-x-6 p-4 px-6 rounded-2xl bg-[#0A0A0C]/50 z-50 border border-white/10">
        <ZoomOutButton />
      </div>
      <div class="overflow-auto p-10">
        <div class="relative h-screen w-screen">
          <h1 class="font-bold text-[210px] 2xl:text-[310px] absolute opacity-20 inset-x-0 text-center">{$activePlanet}</h1>
          <div class="absolute top-1/5 -right-32 z-10 w-[100vw] h-[100vw]">
            <Canvas>
              <!-- <PerspectiveCamera position={ogCameraPosition} fov={50} /> -->
    
              <T.DirectionalLight castShadow position={[30, 10, 25]} intensity={.8} />
              <T.DirectionalLight position={[-30, -10, -25]} intensity={.1} />
              
              {#if $activePlanet == 'BlueLobster'}
                <BlueLobster position={[0, 0, 0]} isStatic={true} />
              {:else if $activePlanet == 'BornFiber'}
                <BornFiber position={[0, 0, 0]} isStatic={true} />
              {:else if $activePlanet == 'MindFuture'}
                <MindFuture position={[0, 0, 0]} isStatic={true} />
              {:else if $activePlanet == 'Morpheus'}
                <Morpheus position={[0, 0, 0]} isStatic={true} />
              {:else if $activePlanet == 'Ocrevus'}
                <Ocrevus position={[0, 0, 0]} isStatic={true} />
              {:else if $activePlanet == 'Paladin'}
                <Paladin position={[0, 0, 0]} isStatic={true} />
              {:else if $activePlanet == 'Pleo'}
                <Pleo position={[0, 0, 0]} isStatic={true} />
              {:else if $activePlanet == 'ZibraSport'}
                <ZibraSport position={[0, 0, 0]} isStatic={true} />
              {:else if $activePlanet == 'ZibraTech'}
                <ZibraTech position={[0, 0, 0]} isStatic={true} />
              {/if}
            </Canvas>
          </div>
        </div>
        <div>
          amdasmdkalsmdkasldm
        </div>
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
