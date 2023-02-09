<script lang="ts">
  import { T, InteractiveObject, useFrame } from "@threlte/core";
  import { zoomIn } from "$lib/utils";
  import { onDestroy } from "svelte";
  import { spring } from "svelte/motion";
  import { Float } from "@threlte/extras";
  import { mindfutureMaterials } from "$lib/materials";

  export let position: [number, number, number];

  const { material, displace } = mindfutureMaterials();
  const scale = spring(0, { stiffness: 0.05 });

  $: {
    // @ts-expect-error - this property is present when running, not sure why ts doesn't pick up on it.
    displace.strength = $scale;
  }

  useFrame(() => {
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
<Float floatIntensity={0.3}>
  <T.Group {position}>
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
      <T.SphereGeometry args={[1, 256, 256]} />
    </T.Mesh>
  </T.Group>
</Float>
