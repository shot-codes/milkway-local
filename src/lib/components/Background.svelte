<script lang="ts">
  import { T, useFrame } from "@threlte/core";
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
  <T.Mesh material={backgroundMaterial} scale={100}>
    <T.SphereGeometry />
  </T.Mesh>
</T.Group>
