<script>
  import { dev } from "$app/environment";
  import { PerspectiveCamera, OrbitControls, useThrelte, T } from "@threlte/core";
  import { Environment } from "@threlte/extras";
  import { degToRad } from "three/src/math/MathUtils";
  import { cameraClone, cameraPosition, targetPosition } from "$lib/stores";
  import Planet from "$lib/components/Planet.svelte";
  import Particles from "./Particles.svelte";
  import { Brand } from "$lib/utils";
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
    enablePan={true}
    enableZoom={true}
    target={$targetPosition}
  />
</PerspectiveCamera>

<T.DirectionalLight castShadow position={[3, 10, 10]} />
<T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />

<Particles position={[0, 0, 0]} />

<Sun />

<Planet
  brand={Brand.BlueLobster}
  position={[
    orbitRadius * Math.cos((1 * 2 * Math.PI) / 9),
    1,
    orbitRadius * Math.sin((1 * 2 * Math.PI) / 9),
  ]}
  planetSize={2}
  planetOffsetXY={[-2, -1]}
  titleOffsetXY={[0, 3.8]}
  materialIndex={0}
/>

<Planet
  brand={Brand.BornFiber}
  position={[
    orbitRadius * Math.cos((2 * 2 * Math.PI) / 9),
    0,
    orbitRadius * Math.sin((2 * 2 * Math.PI) / 9),
  ]}
  planetSize={3}
  planetOffsetXY={[-2, -1]}
  titleOffsetXY={[-1.5, 5]}
  materialIndex={1}
/>

<Planet
  brand={Brand.MindFuture}
  position={[
    orbitRadius * Math.cos((3 * 2 * Math.PI) / 9),
    1,
    orbitRadius * Math.sin((3 * 2 * Math.PI) / 9),
  ]}
  planetSize={2}
  planetOffsetXY={[-2, -1]}
  titleOffsetXY={[0, 3.8]}
  materialIndex={2}
/>

<Planet
  brand={Brand.Morpheus}
  position={[
    orbitRadius * Math.cos((4 * 2 * Math.PI) / 9),
    1,
    orbitRadius * Math.sin((4 * 2 * Math.PI) / 9),
  ]}
  planetSize={2}
  planetOffsetXY={[-2, -1]}
  titleOffsetXY={[0, 3.8]}
  materialIndex={3}
/>

<Planet
  brand={Brand.Ocreveus}
  position={[
    orbitRadius * Math.cos((5 * 2 * Math.PI) / 9),
    1,
    orbitRadius * Math.sin((5 * 2 * Math.PI) / 9),
  ]}
  planetSize={2}
  planetOffsetXY={[-2, -1]}
  titleOffsetXY={[0, 3.8]}
  materialIndex={4}
/>

<Planet
  brand={Brand.Paladin}
  position={[
    orbitRadius * Math.cos((6 * 2 * Math.PI) / 9),
    1,
    orbitRadius * Math.sin((6 * 2 * Math.PI) / 9),
  ]}
  planetSize={2}
  planetOffsetXY={[-2, -1]}
  titleOffsetXY={[0, 3.8]}
  materialIndex={5}
/>

<Planet
  brand={Brand.Pleo}
  position={[
    orbitRadius * Math.cos((7 * 2 * Math.PI) / 9),
    1,
    orbitRadius * Math.sin((7 * 2 * Math.PI) / 9),
  ]}
  planetSize={2}
  planetOffsetXY={[-2, -1]}
  titleOffsetXY={[0, 3.8]}
  materialIndex={6}
/>

<Planet
  brand={Brand.ZibraSport}
  position={[
    orbitRadius * Math.cos((8 * 2 * Math.PI) / 9),
    1,
    orbitRadius * Math.sin((8 * 2 * Math.PI) / 9),
  ]}
  planetSize={2}
  planetOffsetXY={[-2, -1]}
  titleOffsetXY={[0, 3.8]}
  materialIndex={7}
/>

<Planet
  brand={Brand.ZibraTech}
  position={[
    orbitRadius * Math.cos((9 * 2 * Math.PI) / 9),
    1,
    orbitRadius * Math.sin((9 * 2 * Math.PI) / 9),
  ]}
  planetSize={2}
  planetOffsetXY={[-2, -1]}
  titleOffsetXY={[0, 3.8]}
  materialIndex={8}
/>
