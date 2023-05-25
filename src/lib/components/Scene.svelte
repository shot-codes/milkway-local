<script lang="ts">
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { PerspectiveCamera, OrbitControls, useThrelte, T, Fog, useFrame, InteractiveObject } from "@threlte/core";
  import { GLTF, Float } from "@threlte/extras";
  import { Mesh, Vector3 } from "three";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import {
    cameraClone,
    cameraPosition,
    targetPosition,
    cameraPositionScrollMax,
    zoomedIn,
    contentMax,
  } from "$lib/stores";
  import { planetLocations } from "$lib/utils";
  import Background from "$lib/components/Background.svelte";
  import Particles from "$lib/components/Particles.svelte";
  import Sun from "$lib/components/Sun.svelte";
  import Confinze from "$lib/components/planets/Confinze.svelte";
  import ZibraAS from "$lib/components/planets/ZibraAS.svelte";
  import MindFuture from "$lib/components/planets/MindFuture.svelte";
  import ZibraPartner from "$lib/components/planets/ZibraPartner.svelte";
  import LactoBio from "$lib/components/planets/LactoBio.svelte";
  import PeopleVentures from "$lib/components/planets/PeopleVentures.svelte";

  let canvas: HTMLCanvasElement;
  let innerHeight: number;
  let innerWidth: number;
  let windowAspect: number;
  let fov = 50;
  let planetRotationX = tweened(0, { duration: 3000 });
  let planetRotationY = tweened(0, { duration: 3000 });
  let planetRotationZ = tweened(0, { duration: 3000 });
  let ferrariRotation = 0;
  let acceleration = 0;

  const fogOptions = tweened({ near: 35, far: 75 }, { duration: 1200 });
  const { camera } = useThrelte();

  $: cameraClone.set($camera);

  $: {
    if ($zoomedIn) {
      fogOptions.set({ near: 10, far: 15 });
    }
    if (!$zoomedIn) {
      fogOptions.set({ near: 15, far: 175 });
    }
  }

  useFrame(() => {
    ferrariRotation -= 0.001;
    if (!$zoomedIn) {
      $planetRotationX += 0.2;
      $planetRotationY += 0.1;
      $planetRotationZ += 0.04;
    }
  });

  $: {
    windowAspect = innerWidth / innerHeight;
    if (windowAspect < 1) {
      fov = 70 / windowAspect;
    } else {
      fov = 70 / windowAspect + 20;
    }
  }

  onMount(() => {
    canvas = document.getElementsByTagName("canvas")[0];
    canvas.addEventListener("wheel", (e: WheelEvent) => {
      if ($zoomedIn) {
        if ($camera.position.y >= $cameraPositionScrollMax && e.deltaY < 0) return;
        if ($camera.position.y <= $contentMax && e.deltaY > 0) return;
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

<svelte:window bind:innerHeight bind:innerWidth />

<PerspectiveCamera position={$cameraPosition} {fov}>
  {#if $zoomedIn}
    <OrbitControls
      enableRotate={false}
      enablePan={false}
      enableZoom={false}
      target={$targetPosition}
    />
  {:else}
    <OrbitControls
      maxPolarAngle={160 * DEG2RAD}
      minPolarAngle={30 * DEG2RAD}
      enableDamping
      enableRotate={true}
      enablePan={false}
      enableZoom={false}
      autoRotate={true}
      autoRotateSpeed={0.15}
      target={$targetPosition}
    />
  {/if}
</PerspectiveCamera>

<T.AmbientLight intensity={0.3} />
<T.DirectionalLight castShadow position={[8, 8, -8]} />
<Fog color={"#000000"} near={$fogOptions.near} far={$fogOptions.far} />

<Background />
<Particles position={[0, 0, 0]} />
<Sun />
<ZibraAS position={planetLocations[0]} />
<Confinze position={planetLocations[1]} />
<MindFuture position={planetLocations[2]} />
<ZibraPartner position={planetLocations[3]} />
<LactoBio position={planetLocations[4]} />
<PeopleVentures position={planetLocations[5]} />

<T.Group rotation.y={ferrariRotation} rotation.x={-acceleration}>
  <T.Group position.x={10} rotation.y={180 * DEG2RAD}>
    <Float speed={3} floatIntensity={3}>
      <GLTF url={"/models/ferrari_812_superfast.glb"} scale={50} interactive on:click={() => {
        let accelerationSpeed = 0.005;
        let drivingTime = 12;

        // Make it into seconds
        drivingTime = drivingTime * 1000;

        let intervalStart = setInterval(() => {
          acceleration += accelerationSpeed;
          ferrariRotation -= acceleration;
        }, 50)

        setTimeout(() => {
          clearInterval(intervalStart);

          let intervalEnd = setInterval(() => {
            acceleration -= accelerationSpeed;
            ferrariRotation -= acceleration;
          }, 50);

          setTimeout(() => {
            clearInterval(intervalEnd);
          }, drivingTime);
        }, drivingTime);
      }} />
    </Float>
  </T.Group>
</T.Group>
