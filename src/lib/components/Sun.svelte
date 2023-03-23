<!-- <script lang="ts">
  import { zoomedIn } from "$lib/stores";
  import { zoomInSun } from "$lib/utils";
  import { T, InteractiveObject } from "@threlte/core";
</script>

<T.Mesh let:ref>
  <InteractiveObject
    object={ref}
    interactive
    on:click={() => {
      if (!$zoomedIn) {
        zoomInSun();
      }
    }}
  />
  <T.SphereGeometry args={[6, 32, 32]} />
  <T.MeshStandardMaterial color="red" />
</T.Mesh> -->
<script lang="ts">
  import { T, useFrame, InteractiveObject } from "@threlte/core";
  import { sunMaterial } from "$lib/materials";
  const { material, displace } = sunMaterial();
  import { zoomedIn } from "$lib/stores";
  import { zoomInSun } from "$lib/utils";

  useFrame(() => {
    // @ts-expect-error
    displace.offset[0] += 0.01;
    // @ts-expect-error
    displace.offset[1] += 0.01;
    // @ts-expect-error
    displace.offset[2] += 0.01;
  });
</script>

<T.Mesh {material} let:ref>
  <InteractiveObject
    object={ref}
    interactive
    on:click={() => {
      if (!$zoomedIn) {
        zoomInSun();
      }
    }}
  />
  <T.SphereGeometry args={[6, 128]} />
</T.Mesh>