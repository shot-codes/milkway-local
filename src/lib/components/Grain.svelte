<script lang="ts">
  import { Canvas, OrbitControls, T } from "@threlte/core";
  import GrainFx from "./GrainFX.svelte";
  import { DEG2RAD } from "three/src/math/MathUtils";
</script>

<div class="absolute top-0 h-full w-full pointer-events-none">
  <Canvas>
    <T.PerspectiveCamera makeDefault position={[10, 0, 0]} fov={24}>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        target={{ x: 0, y: 0, z: 0 }}
      />
    </T.PerspectiveCamera>

    <T.DirectionalLight castShadow position={[10, 2, -10]} />
    <T.AmbientLight intensity={0.2} />

    <T.Mesh rotation.y={DEG2RAD * 90} position.x={-10}>
      <T.CircleGeometry args={[20, 72]} />
      <T.MeshStandardMaterial color="#505050" transparent={true} opacity={0.1} />
    </T.Mesh>

    <GrainFx />
  </Canvas>
</div>
