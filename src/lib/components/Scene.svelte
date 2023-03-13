<script lang="ts">
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { PerspectiveCamera, OrbitControls, useThrelte, T, Fog } from "@threlte/core";
  import { Vector3 } from "three";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import {
    cameraClone,
    cameraPosition,
    targetPosition,
    cameraPositionScrollMax,
    zoomedIn,
  } from "$lib/stores";
  import { planetLocations } from "$lib/utils";
  import Background from "$lib/components/Background.svelte";
  import Particles from "$lib/components/Particles.svelte";
  import Sun from "$lib/components/Sun.svelte";
  import Confinze from "$lib/components/planets/Confinze.svelte";
  import ZibraHolding from "$lib/components/planets/ZibraHolding.svelte";
  import MindFuture from "$lib/components/planets/MindFuture.svelte";
  import Morpheus from "$lib/components/planets/Morpheus.svelte";
  import Ocreveus from "$lib/components/planets/Ocreveus.svelte";
  import Paladin from "$lib/components/planets/Paladin.svelte";
  import Pleo from "$lib/components/planets/Pleo.svelte";
  import ZibraSport from "$lib/components/planets/ZibraSport.svelte";
  import ZibraTech from "$lib/components/planets/ZibraTech.svelte";

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
        }
      }
    });
  });
</script>

<PerspectiveCamera position={$cameraPosition} fov={50}>
  {#if $zoomedIn}
    <OrbitControls
      enableRotate={false}
      enablePan={false}
      enableZoom={false}
      target={$targetPosition}
    />
    <T.PointLight castShadow={true} position={[-90, 60, 60]} distance={350} intensity={1}></T.PointLight>
  {:else}
    <OrbitControls
      maxPolarAngle={100 * DEG2RAD}
      minPolarAngle={30 * DEG2RAD}
      enableDamping
      enableRotate={true}
      enablePan={false}
      enableZoom={false}
      target={$targetPosition}
    />
  {/if}
</PerspectiveCamera>

<T.DirectionalLight castShadow position={[10, 10, -10]} />
<Fog color={"#000000"} near={$fogOptions.near} far={$fogOptions.far} />

<Background />
<Particles position={[0, 0, 0]} />
<Sun />
<ZibraHolding position={planetLocations[0]} />
<Confinze position={planetLocations[1]} />
<MindFuture position={planetLocations[2]} />
<Morpheus position={planetLocations[3]} />
<Ocreveus position={planetLocations[4]} />
<Paladin position={planetLocations[5]} />
<Pleo position={planetLocations[6]} />
<ZibraSport position={planetLocations[7]} />
<ZibraTech position={planetLocations[8]} />
