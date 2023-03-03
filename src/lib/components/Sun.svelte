<script lang="ts">
  import { T, useFrame } from "@threlte/core";
  import { sunMaterial } from "$lib/materials";
  import { PointLight } from "three";

  const { material, displace } = sunMaterial();

  useFrame(() => {
    // @ts-expect-error
    displace.offset[0] += 0.01;
    // @ts-expect-error
    displace.offset[1] += 0.01;
    // @ts-expect-error
    displace.offset[2] += 0.01;
  });
</script>

<T.Mesh {material}>
  <T.SphereGeometry args={[6, 256]} />
</T.Mesh>
