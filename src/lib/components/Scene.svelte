<script>
  import { PerspectiveCamera, OrbitControls } from "@threlte/core";
  import { Environment } from "@threlte/extras";
  import { degToRad } from "three/src/math/MathUtils";
  import Planet from "./Planet.svelte";
  import { cameraPosition, targetPosition } from "$lib/stores";
</script>

<Environment path="/" files="env_map.hdr" isBackground={true} format="ldr" />

<!-- Camera -->
<PerspectiveCamera position={$cameraPosition} fov={50}>
  <OrbitControls
    maxPolarAngle={degToRad(100)}
    minPolarAngle={degToRad(20)}
    enableDamping
    enablePan={false}
    enableZoom={true}
    target={$targetPosition}
  />
</PerspectiveCamera>

<!-- Lighting -->
<!-- <T.DirectionalLight castShadow position={[3, 10, 10]} /> -->
<!-- <T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} /> -->
<!-- <T.AmbientLight intensity={0.2} /> -->

<Planet position={[2, 0, 2]} />

<Planet position={[-2, 0, -2]} />

<Planet position={[2, 0, -2]} />
