<script lang="ts">
  import { T, useFrame } from "@threlte/core";
  import { backgroundMaterial } from "$lib/materials";
  import { DEG2RAD } from "three/src/math/MathUtils";

  // let x = 0;

  useFrame(() => {
    // x += 0.00002;
    // @ts-ingore unknown prop for some reason. Its there at runtime.
    // noise.offset = [x, -x, x];
  });
</script>

<!-- <Fog color="black" near={50} far={120} /> -->
<T.AmbientLight intensity={0.30} />

<T.Group rotation.x={90 * DEG2RAD} rotation.y={180 * DEG2RAD}>
  <T.Mesh material={backgroundMaterial} scale={1000}>
    <T.SphereGeometry />
  </T.Mesh>
</T.Group>
