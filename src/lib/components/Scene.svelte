<script lang="ts">
  import { PerspectiveCamera, OrbitControls, useThrelte, T, Fog } from "@threlte/core";
  import {
    cameraClone,
    cameraPosition,
    targetPosition,
    cameraPositionScrollMax,
    zoomedIn,
  } from "$lib/stores";
  import { Vector3 } from "three";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { orbitRadius, Brand } from "$lib/utils";
  import Background from "$lib/components/Background.svelte";
  import Particles from "$lib/components/Particles.svelte";
  import Sun from "$lib/components/Sun.svelte";
  import Planet from "$lib/components/Planet.svelte";
  import BornFiber from "$lib/components/planets/BornFiber.svelte";

  let canvas: HTMLCanvasElement;
  const fogOptions = tweened({ near: 35, far: 75 }, { duration: 3000 });
  const { camera } = useThrelte();

  $: cameraClone.set($camera);

  $: {
    if ($zoomedIn) {
      fogOptions.set({ near: 10, far: 15 });
    }
    if (!$zoomedIn) {
      fogOptions.set({ near: 35, far: 75 });
    }
  }

  onMount(() => {
    canvas = document.getElementsByTagName("canvas")[0];
    canvas.addEventListener("wheel", (e: WheelEvent) => {
      if ($zoomedIn) {
        if ($camera.position.y >= $cameraPositionScrollMax && e.deltaY < 0) return;
        if ($camera.position.y <= -6 && e.deltaY > 0) return;
        try {
          $cameraPosition = $cameraPosition.add(new Vector3(0, -e.deltaY / 200, 0));
          $targetPosition = $targetPosition.add(new Vector3(0, -e.deltaY / 200, 0));
        } catch (e) {
          // Since zoomedIn is set upon clicking a planet, this event listener fires
          // if you scroll _while_ the camera is flying into position.
          // I was prepared to have to block scrolling _until_ the camera is in position
          // but cameraPosition happens to fail here... Convenient.
          // We will need to test this across devices/browsers.
          // Only works while zooming in, not out.
        }
      }
    });
  });
</script>

<Fog color={"#000000"} near={$fogOptions.near} far={$fogOptions.far} />

<Background />

<PerspectiveCamera position={$cameraPosition} fov={50}>
  {#if $zoomedIn}
    <OrbitControls
      enableDamping
      enableRotate={false}
      enablePan={false}
      enableZoom={false}
      target={$targetPosition}
    />
  {:else}
    <OrbitControls
      maxPolarAngle={100 * DEG2RAD}
      minPolarAngle={20 * DEG2RAD}
      enableDamping
      enableRotate={true}
      enablePan={false}
      enableZoom={true}
      target={$targetPosition}
    />
  {/if}
</PerspectiveCamera>

<T.DirectionalLight castShadow position={[10, 10, -10]} />
<!-- <T.AmbientLight intensity={0.02} /> -->

<Particles position={[0, 0, 0]} />

<Sun />

<T.Group rotation={[0, 0, 0]}>
  <Planet
    brand={Brand.BlueLobster}
    position={[
      orbitRadius * Math.cos((1 * 2 * Math.PI) / 9),
      1,
      orbitRadius * Math.sin((1 * 2 * Math.PI) / 9),
    ]}
    planetSize={2}
    planetOffsetXY={[-2, -1]}
    titleOffsetXY={[0, 3.8]}
    materialIndex={0}
  />

  <BornFiber />

  <Planet
    brand={Brand.MindFuture}
    position={[
      orbitRadius * Math.cos((3 * 2 * Math.PI) / 9),
      1,
      orbitRadius * Math.sin((3 * 2 * Math.PI) / 9),
    ]}
    planetSize={2}
    planetOffsetXY={[-2, -1]}
    titleOffsetXY={[0, 3.8]}
    materialIndex={2}
  />

  <Planet
    brand={Brand.Morpheus}
    position={[
      orbitRadius * Math.cos((4 * 2 * Math.PI) / 9),
      1,
      orbitRadius * Math.sin((4 * 2 * Math.PI) / 9),
    ]}
    planetSize={2}
    planetOffsetXY={[-2, -1]}
    titleOffsetXY={[0, 3.8]}
    materialIndex={3}
  />

  <Planet
    brand={Brand.Ocreveus}
    position={[
      orbitRadius * Math.cos((5 * 2 * Math.PI) / 9),
      1,
      orbitRadius * Math.sin((5 * 2 * Math.PI) / 9),
    ]}
    planetSize={2}
    planetOffsetXY={[-2, -1]}
    titleOffsetXY={[0, 3.8]}
    materialIndex={4}
  />

  <Planet
    brand={Brand.Paladin}
    position={[
      orbitRadius * Math.cos((6 * 2 * Math.PI) / 9),
      1,
      orbitRadius * Math.sin((6 * 2 * Math.PI) / 9),
    ]}
    planetSize={2}
    planetOffsetXY={[-2, -1]}
    titleOffsetXY={[0, 3.8]}
    materialIndex={5}
  />

  <Planet
    brand={Brand.Pleo}
    position={[
      orbitRadius * Math.cos((7 * 2 * Math.PI) / 9),
      1,
      orbitRadius * Math.sin((7 * 2 * Math.PI) / 9),
    ]}
    planetSize={2}
    planetOffsetXY={[-2, -1]}
    titleOffsetXY={[0, 3.8]}
    materialIndex={6}
  />

  <Planet
    brand={Brand.ZibraSport}
    position={[
      orbitRadius * Math.cos((8 * 2 * Math.PI) / 9),
      1,
      orbitRadius * Math.sin((8 * 2 * Math.PI) / 9),
    ]}
    planetSize={2}
    planetOffsetXY={[-2, -1]}
    titleOffsetXY={[0, 3.8]}
    materialIndex={7}
  />

  <Planet
    brand={Brand.ZibraTech}
    position={[
      orbitRadius * Math.cos((9 * 2 * Math.PI) / 9),
      1,
      orbitRadius * Math.sin((9 * 2 * Math.PI) / 9),
    ]}
    planetSize={2}
    planetOffsetXY={[-2, -1]}
    titleOffsetXY={[0, 3.8]}
    materialIndex={8}
  />
</T.Group>
