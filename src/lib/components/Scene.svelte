<script lang="ts">
  import { dev } from "$app/environment";
  import { onMount } from "svelte";
  import { spring, tweened } from "svelte/motion";
  import { useThrelte, T, useFrame } from "@threlte/core";
  import { Float, OrbitControls, interactivity } from "@threlte/extras";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import {
    cameraClone,
    cameraPosition,
    targetPosition,
    cameraPositionScrollMax,
    zoomedIn,
    zoomedInWithDelay,
    contentMax,
  } from "$lib/stores";
  import { type System, generateOrbitPositions } from "$lib/utils";
  import Background from "$lib/components/Background.svelte";
  import Particles from "$lib/components/Particles.svelte";
  import Sun from "$lib/components/planet/Sun.svelte";
  import Ferrari from "$lib/assets/models/Ferrari.svelte";
  import Planet from "./planet/Planet.svelte";

  interactivity({
    filter: (hits) => {
      return hits.slice(0, 1);
    },
  });

  export let system: System;

  let canvas: HTMLCanvasElement;
  let innerHeight: number;
  let innerWidth: number;
  let windowAspect: number;
  let fov = 24;
  const orbitPositions = generateOrbitPositions({
    n: system.planets.length,
    radius: 20,
    yMin: -5,
    yMax: 5,
  });
  const planetRotationX = tweened(0, { duration: 3000 });
  const planetRotationY = tweened(0, { duration: 3000 });
  const planetRotationZ = tweened(0, { duration: 3000 });
  let ferrariRotation = 0;
  const ferrariAcceleration = tweened(0.001, { duration: 3000 });

  const fogOptions = tweened({ near: 35, far: 75 }, { duration: 1200 });
  const { camera, scene } = useThrelte();

  $: cameraClone.set($camera);

  $: {
    if ($zoomedIn) {
      fogOptions.set({ near: 10, far: 15 });
    }
    if (!$zoomedIn) {
      fogOptions.set({ near: 15, far: 205 });
    }
  }

  useFrame(() => {
    ferrariRotation -= $ferrariAcceleration;
    if (!$zoomedIn) {
      $planetRotationX += 0.2;
      $planetRotationY += 0.1;
      $planetRotationZ += 0.04;
    }
  });

  $: {
    windowAspect = innerWidth / innerHeight;
    if (windowAspect < 1) {
      fov = 24 / windowAspect;
    } else {
      fov = 24 / windowAspect + 20;
    }
  }

  onMount(() => {
    canvas = document.getElementsByTagName("canvas")[0];
    canvas.addEventListener("wheel", (e: WheelEvent) => {
      if ($zoomedInWithDelay) {
        const newPosition: [number, number, number] = [
          $cameraPosition[0],
          $cameraPosition[1] + -e.deltaY / 200,
          $cameraPosition[2],
        ];
        const newTarget: [number, number, number] = [
          $targetPosition[0],
          $targetPosition[1] + -e.deltaY / 200,
          $targetPosition[2],
        ];

        if (newPosition[1] >= $cameraPositionScrollMax || newPosition[1] <= $contentMax) {
          return;
        }
        cameraPosition.set(newPosition, { duration: 100 });
        targetPosition.set(newTarget, { duration: 100 });
      }
    });
  });
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<T.PerspectiveCamera position={$cameraPosition} makeDefault {fov}>
  {#if $zoomedIn}
    <OrbitControls
      enableRotate={false}
      enablePan={false}
      enableZoom={false}
      target={$targetPosition}
      enableDamping
    />
  {:else}
    <OrbitControls
      maxPolarAngle={160 * DEG2RAD}
      minPolarAngle={30 * DEG2RAD}
      enableDamping
      enableRotate={true}
      enablePan={false}
      enableZoom={dev ? true : false}
      autoRotate={true}
      autoRotateSpeed={0.15}
      target={$targetPosition}
    />
  {/if}
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.3} />
<T.DirectionalLight castShadow position={[8, 8, -8]} />
<T.Fog
  on:create={({ ref, cleanup }) => {
    scene.fog = ref;
    cleanup(() => (scene.fog = null));
  }}
  color={0x000000}
  near={$fogOptions.near}
  far={$fogOptions.far}
/>

<!-- <Background /> -->
<!-- <Particles position={[0, 0, 0]} /> -->
<Sun />

{#each system.planets as planet, index}
  <Planet {planet} position={orbitPositions[index]} />
{/each}

<!-- Ferrari -->
<T.Group rotation.y={ferrariRotation} rotation.x={-$ferrariAcceleration * 2}>
  <T.Group position.x={10} rotation.y={90 * DEG2RAD}>
    <Float speed={3} floatIntensity={3} rotationIntensity={1} rotationSpeed={1}>
      <T.Group>
        <Ferrari scale={0.7} />
        <T.Mesh
          position.y={0.4}
          on:click={() => {
            ferrariAcceleration.set(0.2);
            setTimeout(() => {
              ferrariAcceleration.set(0.001);
            }, 10000);
          }}
        >
          <T.BoxGeometry args={[2.4, 0.7, 1.3]} />
          <T.MeshBasicMaterial transparent opacity={0} />
        </T.Mesh>
      </T.Group>
    </Float>
  </T.Group>
</T.Group>
