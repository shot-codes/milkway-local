<script lang="ts">
  import { T, LayerableObject, Layers, useFrame } from "@threlte/core";
  import { Fog } from "@threlte/core";
  import { backgroundMaterial, noise } from "$lib/materials";

  let x = 0;

  useFrame(() => {
    x += 0.00002;
    // @ts-ingore unknown prop for some reason. Its there at runtime.
    noise.offset = [x, -x, x];
  });
</script>

<!-- <Fog color="black" near={50} far={120} /> -->
<!-- <T.AmbientLight intensity={0.15} /> -->

<T.Group>
  <T.Mesh let:ref material={backgroundMaterial} scale={100}>
    <LayerableObject object={ref} />
    <T.SphereGeometry />
  </T.Mesh>
</T.Group>

<T.AmbientLight let:ref intensity={2}>
  <LayerableObject object={ref} />
</T.AmbientLight>
