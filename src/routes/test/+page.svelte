<script lang="ts">
  import { OrbitControls, Canvas, T } from "@threlte/core";
  import { GLTF } from "@threlte/extras";
</script>

<!-- Threlte content -->
<div class="w-full h-full absolute">
  <Canvas>
    <T.PerspectiveCamera makeDefault position={[0, 0, 40]} fov={24}>
      <OrbitControls enableDamping />
    </T.PerspectiveCamera>

    <T.DirectionalLight castShadow position={[3, 10, 10]} />
    <T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
    <T.AmbientLight intensity={0.2} />

    <GLTF url={"/models/ferrari_812_superfast.glb"} scale={100} />
  </Canvas>
</div>
