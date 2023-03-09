<script lang="ts">
  import { dev } from "$app/environment";
  import {
    PerspectiveCamera,
    OrbitControls,
    useThrelte,
    T,
    Layers,
    LayerableObject,
  } from "@threlte/core";
  import { Environment } from "@threlte/extras";
  import { degToRad } from "three/src/math/MathUtils";
  import { cameraClone, cameraPosition, targetPosition, zoomedIn } from "$lib/stores";
  import Planet from "$lib/components/Planet.svelte";
  import Particles from "./Particles.svelte";
  import { Brand } from "$lib/utils";
  import Sun from "./Sun.svelte";
  import { onMount } from "svelte";
  import { Vector3 } from "three";
  import PlanetContent from "./PlanetContent.svelte";
  import Background from "./Background.svelte";

  const orbitRadius = 25;
  let canvas: HTMLCanvasElement;

  const { camera } = useThrelte();
  $: cameraClone.set($camera);

  onMount(() => {
    canvas = document.getElementsByTagName("canvas")[0];
    canvas.addEventListener("wheel", (e: WheelEvent) => {
      if ($zoomedIn) {
        try {
          $cameraPosition = $cameraPosition.add(new Vector3(0, -e.deltaY / 200, 0));
          $targetPosition = $targetPosition.add(new Vector3(0, -e.deltaY / 200, 0));
        } catch (e) {
          // Since zoomedIn is set upon clicking a planet, this event listener fires
          // if you scroll _while_ the camera is flying into position.
          // I was prepared to have to block scrolling _until_ the camera is in position
          // but cameraPosition happens to fail here... Convenient.
          // We will need to test this across devices/browsers.
        }
      }
    });
  });
</script>

<!-- <Environment
  path="/"
  files={dev ? "env_map_lowres.hdr" : "env_map.hdr"}
  isBackground={true}
  format="ldr"
/> -->

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
      maxPolarAngle={degToRad(100)}
      minPolarAngle={degToRad(20)}
      enableDamping
      enableRotate={true}
      enablePan={false}
      enableZoom={true}
      target={$targetPosition}
    />
  {/if}
</PerspectiveCamera>

<T.DirectionalLight castShadow position={[3, 4, 10]} />
<!-- <T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} /> -->

<Particles position={[0, 0, 0]} />

<Sun />

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

<Planet
  brand={Brand.BornFiber}
  position={[
    orbitRadius * Math.cos((2 * 2 * Math.PI) / 9),
    0,
    orbitRadius * Math.sin((2 * 2 * Math.PI) / 9),
  ]}
  planetSize={3}
  planetOffsetXY={[-2, -1]}
  titleOffsetXY={[-0.5, 4]}
  materialIndex={1}
>
  <!-- <div slot="content" class="bg-neutral-800 rounded-lg opacity-50 p-6 text-white pointer-events-none">
    <p>How fuckin sweet is this eh?</p>
  </div> -->
  <div slot="content">
    <PlanetContent>
      <span slot="title">Network &bull; Est. 2005</span>
      <span slot="description">Yada yada yoda yada</span>
      <span slot="content">Wooooooooooo here we goooooo!</span>
    </PlanetContent>
  </div>
</Planet>

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
