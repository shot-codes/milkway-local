<script>
  import { dev } from "$app/environment";
  import { PerspectiveCamera, OrbitControls, useThrelte, T } from "@threlte/core";
  import { Environment } from "@threlte/extras";
  import { degToRad } from "three/src/math/MathUtils";
  import { cameraClone, cameraPosition, targetPosition } from "$lib/stores";
  import MindFuture from "$lib/components/planets/MindFuture.svelte";
  import BornFiber from "./planets/BornFiber.svelte";
  import BlueLobster from "./planets/BlueLobster.svelte";
  import Morpheus from "./planets/Morpheus.svelte";
  import Ocrevus from "./planets/Ocrevus.svelte";
  import Paladin from "./planets/Paladin.svelte";
  import Pleo from "./planets/Pleo.svelte";
  import ZibraSport from "./planets/ZibraSport.svelte";
  import ZibraTech from "./planets/ZibraTech.svelte";
  import Particles from "./Particles.svelte";
  import Sun from "./Sun.svelte";

  const orbitRadius = 25;
  const randomYFactor = 2;

  const { camera } = useThrelte();
  $: cameraClone.set($camera);
</script>

<!-- <Environment
  path="/"
  files={dev ? "env_map_lowres.hdr" : "env_map.hdr"}
  isBackground={true}
  format="ldr"
/> -->

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

<MindFuture
  position={[
    orbitRadius * Math.cos((1 * 2 * Math.PI) / 9),
    (Math.random() - 0.5) * randomYFactor,
    orbitRadius * Math.sin((1 * 2 * Math.PI) / 9),
  ]}
/>
<BornFiber
  position={[
    orbitRadius * Math.cos((2 * 2 * Math.PI) / 9),
    (Math.random() - 0.5) * randomYFactor,
    orbitRadius * Math.sin((2 * 2 * Math.PI) / 9),
  ]}
/>
<BlueLobster
  position={[
    orbitRadius * Math.cos((3 * 2 * Math.PI) / 9),
    (Math.random() - 0.5) * randomYFactor,
    orbitRadius * Math.sin((3 * 2 * Math.PI) / 9),
  ]}
/>
<Morpheus
  position={[
    orbitRadius * Math.cos((4 * 2 * Math.PI) / 9),
    (Math.random() - 0.5) * randomYFactor,
    orbitRadius * Math.sin((4 * 2 * Math.PI) / 9),
  ]}
/>
<Ocrevus
  position={[
    orbitRadius * Math.cos((5 * 2 * Math.PI) / 9),
    (Math.random() - 0.5) * randomYFactor,
    orbitRadius * Math.sin((5 * 2 * Math.PI) / 9),
  ]}
/>
<Paladin
  position={[
    orbitRadius * Math.cos((6 * 2 * Math.PI) / 9),
    (Math.random() - 0.5) * randomYFactor,
    orbitRadius * Math.sin((6 * 2 * Math.PI) / 9),
  ]}
/>
<Pleo
  position={[
    orbitRadius * Math.cos((7 * 2 * Math.PI) / 9),
    (Math.random() - 0.5) * randomYFactor,
    orbitRadius * Math.sin((7 * 2 * Math.PI) / 9),
  ]}
/>
<ZibraSport
  position={[
    orbitRadius * Math.cos((8 * 2 * Math.PI) / 9),
    (Math.random() - 0.5) * randomYFactor,
    orbitRadius * Math.sin((8 * 2 * Math.PI) / 9),
  ]}
/>
<ZibraTech
  position={[
    orbitRadius * Math.cos((9 * 2 * Math.PI) / 9),
    (Math.random() - 0.5) * randomYFactor,
    orbitRadius * Math.sin((9 * 2 * Math.PI) / 9),
  ]}
/>
