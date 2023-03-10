<script lang="ts">
  import { T, InteractiveObject } from "@threlte/core";
  import { Text, HTML } from "@threlte/extras";
  import { zoomIn, Brand } from "$lib/utils";
  import { onDestroy } from "svelte";
  import { spring, tweened } from "svelte/motion";
  import { materials } from "$lib/materials";
  import { zoomedIn, activePlanet } from "$lib/stores";
  import Label from "./Label.svelte";

  export let position: [number, number, number];
  export let planetSize = 1;
  export let materialIndex = 0;
  export let planetOffsetXY: [number, number];
  export let titleOffsetXY: [number, number];
  export let brand: Brand;

  let showDetails = false;
  const clonedPlanetSize = spring(planetSize, { stiffness: 0.03, damping: 0.5 });
  const { material } = materials[materialIndex]();
  const scale = spring(1, { stiffness: 0.05 });
  const textOpacity = tweened(0, { delay: 500, duration: 200 });
  const labelOpacity = tweened(1, { delay: 500, duration: 100 });

  $: {
    if ($zoomedIn && $activePlanet == brand) {
      textOpacity.set(0.4);
      labelOpacity.set(0);
      clonedPlanetSize.set(2);
    } else {
      textOpacity.set(0);
      labelOpacity.set(1);
      clonedPlanetSize.set(planetSize);
    }
  }

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

    <T.Mesh {material} scale={1}>
      <T.SphereGeometry args={[$clonedPlanetSize, 64, 64]} />
    </T.Mesh>

    <!-- Seperate, simpler sphere for interaction. Performance reasons -->
    <T.Mesh let:ref scale={1 - 0.1}>
      <InteractiveObject
        object={ref}
        interactive
        on:click={() => {
          activePlanet.set(brand);
          zoomIn(position);
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
      <T.SphereGeometry args={[$clonedPlanetSize, 16, 16]} />
    </T.Mesh>
  </T.Group>

  {#if $zoomedIn && $activePlanet == brand}
    <HTML transform position={{ y: -1.5, x: 2 }} scale={0.15} pointerEvents="none">
      <slot name="content" />
    </HTML>
  {/if}
</T.Group>
