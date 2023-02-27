<script lang="ts">
  import { T, InteractiveObject, useFrame, useThrelte } from "@threlte/core";
  import { zoomIn } from "$lib/utils";
  import { onDestroy } from "svelte";
  import { spring, tweened } from "svelte/motion";
  import { Text } from "@threlte/extras";
  import { mindfutureMaterials } from "$lib/materials";
  import { zoomedIn } from "$lib/stores";
  import { fade } from "svelte/transition";

  export let position: [number, number, number];

  const { camera } = useThrelte();
  let textRotation = { x: 0, y: 0, z: 0 };
  const { material, displace } = mindfutureMaterials();
  const scale = spring(0, { stiffness: 0.05 });
  let orbitAnimation = 0;

  const textOpacity = tweened(0, { delay: 500, duration: 2000 });

  $: {
    console.log($zoomedIn);
    if ($zoomedIn) textOpacity.set(1);
    else textOpacity.set(0);
  }

  // @ts-expect-error - this property is present when running, not sure why ts doesn't pick up on it.
  $: displace.strength = $scale;

  useFrame(() => {
    // TODO: This should be possible without useFrame, in a reactive statement. It was running when $camera was update though...
    textRotation = $camera.rotation;
    orbitAnimation += 0.01;

    if ($scale > 0) {
      // @ts-expect-error - this property is present when running, not sure why ts doesn't pick up on it.
      displace.offset[0] += 0.005;
    }
  });

  onDestroy(() => {
    material.dispose();
  });
</script>

<!-- Planet -->
<T.Group {position}>
  <Text
    text={"MindFuture"}
    anchorX="center"
    scale={10}
    position={{ y: 2.9 }}
    rotation={textRotation}
    fillOpacity={$textOpacity}
  />

  <T.Mesh let:ref {material}>
    <InteractiveObject
      object={ref}
      interactive
      on:click={() => zoomIn(position)}
      on:pointerenter={() => {
        $scale = 0.5;
      }}
      on:pointerleave={() => {
        $scale = 0;
      }}
    />
    <T.SphereGeometry args={[2, 256, 256]} />
  </T.Mesh>
</T.Group>

<!-- Orbit -->
<T.Group {position} rotation.y={orbitAnimation}>
  <T.Mesh let:ref {material} position={[3.5, 0, 0]}>
    <InteractiveObject
      object={ref}
      interactive
      on:click={() => zoomIn(position)}
      on:pointerenter={() => {
        $scale = 0.5;
      }}
      on:pointerleave={() => {
        $scale = 0;
      }}
    />
    <T.SphereGeometry args={[0.6, 256, 256]} />
  </T.Mesh>
</T.Group>
