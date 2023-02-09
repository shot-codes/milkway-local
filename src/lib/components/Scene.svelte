<script>
  import { dev } from "$app/environment";
  import { PerspectiveCamera, OrbitControls, useThrelte } from "@threlte/core";
  import { Environment } from "@threlte/extras";
  import { degToRad } from "three/src/math/MathUtils";
  import { cameraClone, cameraPosition, targetPosition } from "$lib/stores";
  import MindFuture from "$lib/components/planets/MindFuture.svelte";
    import Sun from "./Sun.svelte";

  const orbitRadius = 25;

  const { camera } = useThrelte();
  $: cameraClone.set($camera);
</script>

<Environment
  path="/"
  files={dev ? "env_map_lowres.hdr" : "env_map.hdr"}
  isBackground={true}
  format="ldr"
/>

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

<Sun position={[0, 0, 0]}></Sun>

<MindFuture
  position={[
    orbitRadius * Math.cos((1 * 2 * Math.PI) / 9),
    0,
    orbitRadius * Math.sin((1 * 2 * Math.PI) / 9),
  ]}
/>
<MindFuture
  position={[
    orbitRadius * Math.cos((2 * 2 * Math.PI) / 9),
    0,
    orbitRadius * Math.sin((2 * 2 * Math.PI) / 9),
  ]}
/>
<MindFuture
  position={[
    orbitRadius * Math.cos((3 * 2 * Math.PI) / 9),
    0,
    orbitRadius * Math.sin((3 * 2 * Math.PI) / 9),
  ]}
/>
<MindFuture
  position={[
    orbitRadius * Math.cos((4 * 2 * Math.PI) / 9),
    0,
    orbitRadius * Math.sin((4 * 2 * Math.PI) / 9),
  ]}
/>
<MindFuture
  position={[
    orbitRadius * Math.cos((5 * 2 * Math.PI) / 9),
    0,
    orbitRadius * Math.sin((5 * 2 * Math.PI) / 9),
  ]}
/>
<MindFuture
  position={[
    orbitRadius * Math.cos((6 * 2 * Math.PI) / 9),
    0,
    orbitRadius * Math.sin((6 * 2 * Math.PI) / 9),
  ]}
/>
<MindFuture
  position={[
    orbitRadius * Math.cos((7 * 2 * Math.PI) / 9),
    0,
    orbitRadius * Math.sin((7 * 2 * Math.PI) / 9),
  ]}
/>
<MindFuture
  position={[
    orbitRadius * Math.cos((8 * 2 * Math.PI) / 9),
    0,
    orbitRadius * Math.sin((8 * 2 * Math.PI) / 9),
  ]}
/>
<MindFuture
  position={[
    orbitRadius * Math.cos((9 * 2 * Math.PI) / 9),
    0,
    orbitRadius * Math.sin((9 * 2 * Math.PI) / 9),
  ]}
/>
