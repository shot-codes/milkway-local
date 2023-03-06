<script lang="ts">
  import { OrbitControls, Canvas, T } from "@threlte/core";
  import Test from "$lib/components/Label.svelte";
</script>

<!-- Threlte content -->
<div class="w-full h-full absolute">
  <Canvas>
    <T.PerspectiveCamera makeDefault position={[0, 0, 40]} fov={24}>
      <OrbitControls target={{}} />
    </T.PerspectiveCamera>

    <T.DirectionalLight castShadow position={[3, 10, 10]} />
    <T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
    <T.AmbientLight intensity={0.2} />

    <Test />
  </Canvas>
</div>
