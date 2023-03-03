<script lang="ts">
  import { T, InteractiveObject, useFrame } from "@threlte/core";
  import { zoomIn } from "$lib/utils";
  import { onDestroy } from "svelte";
  import { spring, tweened } from "svelte/motion";
  import { Text } from "@threlte/extras";
  import { material1 } from "$lib/materials";
  import { zoomedIn, activePlanet } from "$lib/stores";

  export let position: [number, number, number];

  const { material, noise } = material1();
  const scale = spring(1, { stiffness: 0.05 });
  const textOpacity = tweened(0, { delay: 500, duration: 2000 });

  $: {
    if ($zoomedIn && $activePlanet == "BlueLobster") textOpacity.set(1);
    else textOpacity.set(0);
  }

  useFrame(() => {
    if ($activePlanet == "BlueLobster") {
      // @ts-expect-error
      noise.offset[0] += 0.001;
      // @ts-expect-error
      noise.offset[1] += 0.001;
      // @ts-expect-error
      noise.offset[2] += 0.001;
    }
  });

  onDestroy(() => {
    material.dispose();
  });
</script>

<!-- Planet -->
<T.Group {position} rotation.y={Math.atan2(position[0], position[2])}>
  <Text
    text={"BlueLobster"}
    anchorX="center"
    scale={15}
    position={{ x: -0.4, y: 3.2, z: -2 }}
    fillOpacity={$textOpacity}
    font={"fonts/space.woff"}
  />

  <T.Mesh let:ref {material} scale={$scale} position.x={2}>
    <InteractiveObject
      object={ref}
      interactive
      on:click={() => {
        activePlanet.set("BlueLobster");
        zoomIn(position);
      }}
      on:pointerenter={() => {
        $scale = 1.5;
      }}
      on:pointerleave={() => {
        $scale = 1;
      }}
    />
    <T.SphereGeometry args={[4, 256, 256]} />
  </T.Mesh>
</T.Group>
