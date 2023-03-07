<script lang="ts">
  import { OrbitControls, Canvas, T, InteractiveObject } from "@threlte/core";
  import Test from "$lib/components/Label.svelte";
  import { GLTF } from "@threlte/extras";
  let showDetails = true;

  // const color = useTexture("/textures/Terra2/terra-2_COL_6K.png");
  // const normal = useTexture("/textures/Terra2/terra-2_NRM_6K.tif");
  // const roughness = useTexture("/textures/Terra2/terra-2_ROU_6K.png");
  // const displace = useTexture("/textures/Terra2/terra-2_DIS_6K.tif");
</script>

<!-- Threlte content -->
<div class="w-full h-full absolute">
  <Canvas>
    <T.PerspectiveCamera makeDefault position={[0, 0, 40]} fov={24}>
      <OrbitControls target={{}} enableDamping enableZoom={false} />
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
      <!-- <T.SphereGeometry args={[2, 64, 64]} />
      <T.MeshStandardMaterial map={color} normalMap={normal} roughnessMap={roughness} displacementMap={displace}/> -->
    </T.Mesh>
    <GLTF url={"/terra_b.glb"} />
  </Canvas>
</div>
