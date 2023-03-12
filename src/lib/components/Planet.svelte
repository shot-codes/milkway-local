<script lang="ts">
  import { T, InteractiveObject, useFrame } from "@threlte/core";
  import { Text } from "@threlte/extras";
  import { zoomIn, Brand } from "$lib/utils";
  import { onDestroy } from "svelte";
  import { spring, tweened, type Tweened } from "svelte/motion";
  import { materials } from "$lib/materials";
  import { zoomedIn, activePlanet } from "$lib/stores";
  import Label from "./Label.svelte";

  interface Moon {
    material: string;
    position: [number, number, number];
  }

  export let position: [number, number, number];
  export let planetSize = 1;
  export let materialIndex = 0;
  export let planetOffsetXY: [number, number];
  export let titleOffsetXY: [number, number];
  export let brand: Brand;
  export let moon1: Moon | undefined = undefined;
  export let moon2: Moon | undefined = undefined;

  const moon1Position: Tweened<[number, number, number]> = tweened([0, 0, 0], { duration: 1000 });
  const moon2Position: Tweened<[number, number, number]> = tweened([0, 0, 0], { duration: 1000 });
  const clonedPlanetSize = spring(planetSize, { stiffness: 0.03, damping: 0.5 });
  const { material } = materials[materialIndex]();
  const scale = spring(1, { stiffness: 0.05 });
  const textOpacity = tweened(0, { delay: 500, duration: 200 });
  const labelOpacity = tweened(1, { delay: 500, duration: 100 });
  let moonRotation = tweened(0, { duration: 3000 });
  let showDetails = false;

  $: {
    if (moon1) {
      $moon1Position = moon1.position;
    }
    if (moon2) {
      $moon2Position = moon2.position;
    }
  }

  $: {
    if ($zoomedIn && $activePlanet == brand) {
      textOpacity.set(1);
      labelOpacity.set(0);
      clonedPlanetSize.set(2.75);
    } else {
      textOpacity.set(0);
      labelOpacity.set(1);
      clonedPlanetSize.set(planetSize);
      if (moon1) {
        $moon1Position = moon1.position;
      }
      if (moon2) {
        $moon2Position = moon2?.position;
      }
    }
  }

  useFrame(() => {
    if (!$zoomedIn) {
      $moonRotation += 0.2;
    }
  });

  onDestroy(() => {
    material.dispose();
  });
</script>

<T.Group {position} rotation.y={Math.atan2(position[0], position[2])}>
  {#if $textOpacity > 0}
    <Text
      text={brand}
      anchorX="center"
      scale={20}
      position={{ x: titleOffsetXY[0], y: titleOffsetXY[1], z: -3 }}
      fillOpacity={$textOpacity}
      font={"fonts/space.woff"}
    />
  {/if}

  <T.Group position.x={planetOffsetXY[0]} position.y={planetOffsetXY[1]}>
    <Label radius={$clonedPlanetSize} text={brand} {showDetails} opacity={$labelOpacity} />

    <T.Mesh {material} scale={$clonedPlanetSize}>
      <T.SphereGeometry args={[1, 64, 64]} />
    </T.Mesh>

    <!-- Seperate, simpler sphere for interaction. For performance reasons -->
    <T.Mesh let:ref scale={$clonedPlanetSize - 0.1}>
      <InteractiveObject
        object={ref}
        interactive
        on:click={() => {
          activePlanet.set(brand);
          zoomIn(position);
          moonRotation.set($moonRotation - ($moonRotation % (2 * Math.PI)));
          moon1Position.set([-5, -5, 0]);
          moon2Position.set([-1, -8, 0]);
        }}
        on:pointerenter={() => {
          showDetails = true;
          $scale = 1.2;
        }}
        on:pointerleave={() => {
          showDetails = false;
          $scale = 1;
        }}
      />
      <T.SphereGeometry args={[1, 16, 16]} />
    </T.Mesh>

    <!-- Moons -->
    <T.Group rotation.y={$moonRotation}>
      {#if moon1}
        <T.Mesh position={$moon1Position}>
          <T.SphereGeometry args={[0.5, 16]} />
          <T.MeshBasicMaterial color={moon1.material} />
        </T.Mesh>
      {/if}
      {#if moon2}
        <T.Mesh position={$moon2Position}>
          <T.SphereGeometry args={[0.5, 16, 16]} />
          <T.MeshBasicMaterial color={moon2.material} />
        </T.Mesh>
      {/if}
    </T.Group>
  </T.Group>

  {#if $zoomedIn && $activePlanet == brand}
    <slot name="content" />
    <slot name="moon1Content" />
    <slot name="moon2Content" />
  {/if}
</T.Group>
