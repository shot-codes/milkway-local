<script lang="ts">
  import { OrbitControls, Canvas, T, InteractiveObject } from "@threlte/core";
  import Test from "$lib/components/Label.svelte";
  let showDetails = true;
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

    <Test text="Test Tester" radius={2} {showDetails} />
    <T.Mesh let:ref>
      <InteractiveObject
        object={ref}
        interactive
        on:pointerenter={() => {
          showDetails = true;
        }}
        on:pointerleave={() => {
          showDetails = false;
        }}
      />
      <T.SphereGeometry args={[2, 20, 20]} />
      <T.MeshBasicMaterial />
    </T.Mesh>
  </Canvas>
</div>
