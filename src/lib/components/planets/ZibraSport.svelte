<script lang="ts">
  import { T, InteractiveObject, useFrame } from "@threlte/core";
  import { zoomIn } from "$lib/utils";
  import { onDestroy } from "svelte";
  import { spring, tweened } from "svelte/motion";
  import { Text } from "@threlte/extras";
  import { material8 } from "$lib/materials";
  import { zoomedIn, activePlanet } from "$lib/stores";
  import Label from "../Label.svelte";

  export let position: [number, number, number];
  export let isStatic: Boolean = false;

  const planetName = "ZibraSport";
  const planetSize = isStatic ? 2 : 3.5;
  let showDetails = false;

  const { material, noise } = material8();
  const scale = spring(1, { stiffness: 0.05 });
  const textOpacity = tweened(0, { delay: 500, duration: 2000 });

  $: {
    if ($zoomedIn && $activePlanet == planetName) textOpacity.set(1);
    else textOpacity.set(0);
  }

  // useFrame(() => {
  //   if ($activePlanet == planetName || isStatic) {
  //     // @ts-expect-error
  //     noise.offset[0] += 0.001;
  //     // @ts-expect-error
  //     noise.offset[1] += 0.001;
  //     // @ts-expect-error
  //     noise.offset[2] += 0.001;
  //   }
  // });

  onDestroy(() => {
    material.dispose();
  });
</script>

<!-- Planet -->
<T.Group {position} rotation.y={Math.atan2(position[0], position[2])}>
  <!-- <Text
    text={planetName}
    anchorX="center"
    scale={15}
    position={{ x: -0.4, y: 3.2, z: -2 }}
    fillOpacity={$textOpacity}
    font={"fonts/space.woff"}
  /> -->

  <T.Group position.x={2}>
    <Label radius={planetSize} text="ZibraSport" {showDetails} />

    <T.Mesh let:ref {material} scale={$scale}>
      <InteractiveObject
        object={ref}
        interactive
        on:click={() => {
          if (isStatic) return;
          activePlanet.set(planetName);
          zoomIn(position);
        }}
        on:pointerenter={() => {
          if (isStatic) return;
          showDetails = true;
          $scale = 1.2;
        }}
        on:pointerleave={() => {
          if (isStatic) return;
          $scale = 1;
          showDetails = false;
        }}
      />
      <T.SphereGeometry args={[planetSize, 256, 256]} />
    </T.Mesh>
  </T.Group>
</T.Group>
