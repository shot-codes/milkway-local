<script lang="ts">
  import { OrbitControls, Canvas, T, useTexture } from "@threlte/core";
  import { Vector2, RepeatWrapping } from "three";
  // import { GLTF } from "@threlte/extras";

  const color = useTexture("/textures/MindFuture/diffuse2.png");
  const normal = useTexture("/textures/MindFuture/normal2.png");
  const displace = useTexture("/textures/MindFuture/height2.png");

  color.wrapS = RepeatWrapping;
  color.wrapT = RepeatWrapping;
  normal.wrapS = RepeatWrapping;
  normal.wrapT = RepeatWrapping;
  displace.wrapS = RepeatWrapping;
  displace.wrapT = RepeatWrapping;

  color.repeat = new Vector2(2, 2);
  normal.repeat = new Vector2(2, 2);
  displace.repeat = new Vector2(2, 2);
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

    <T.Mesh let:ref>
      <T.SphereGeometry args={[10, 64, 64]} />
      <T.MeshStandardMaterial diffuse={color} normalMap={normal} displacementMap={displace} />
    </T.Mesh>
    <!-- <GLTF url={"/terra_b.glb"} /> -->
  </Canvas>
</div>
