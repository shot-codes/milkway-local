<script lang="ts">
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
</T.Mesh>
