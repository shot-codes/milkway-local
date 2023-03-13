<script lang="ts">
  import { T, InteractiveObject, useFrame } from "@threlte/core";
  import { Text } from "@threlte/extras";
  import { zoomIn, Brand } from "$lib/utils";
  import { onDestroy } from "svelte";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import { spring, tweened, type Tweened } from "svelte/motion";
  import { materials, moonMaterials } from "$lib/materials";
  import { zoomedIn, activePlanet } from "$lib/stores";
  import Label from "./Label.svelte";
    import { Group } from "three";

  interface Moon {
    materialIndex: number;
    position: [number, number, number];
  }

  export let position: [number, number, number];
  export let content = "";
  export let planetSize = 1;
  export let materialIndex = 0;
  export let planetOffsetXY: [number, number];
  export let titleOffsetXY: [number, number];
  export let brand: Brand;
  export let radius = 1;
  export let opacity = 1;
  export let moon1: Moon | undefined = undefined;
  export let moon2: Moon | undefined = undefined;

  const moon1Position: Tweened<[number, number, number]> = tweened([0, 0, 0], { duration: 1000 });
  const moon2Position: Tweened<[number, number, number]> = tweened([0, 0, 0], { duration: 1000 });
  const clonedPlanetSize = spring(planetSize, { stiffness: 0.03, damping: 0.5 });
  const { material } = materials[materialIndex]();
  const scale = spring(1, { stiffness: 0.05 });
  const textOpacity = tweened(0, { delay: 500, duration: 200 });
  const labelOpacity = tweened(1, { delay: 500, duration: 100 });
  let moonRotation = tweened(0, { duration: 3000 });
  let showDetails = false;

  $: {
    if (moon1) {
      $moon1Position = moon1.position;
    }
    if (moon2) {
      $moon2Position = moon2.position;
    }
  }

  $: {
    if ($zoomedIn && $activePlanet == brand) {
      textOpacity.set(1);
      labelOpacity.set(0);
      clonedPlanetSize.set(2.75);
    } else {
      textOpacity.set(0);
      labelOpacity.set(1);
      clonedPlanetSize.set(planetSize);
      if (moon1) {
        $moon1Position = moon1.position;
      }
      if (moon2) {
        $moon2Position = moon2?.position;
      }
    }
  }

  useFrame(() => {
    if (!$zoomedIn) {
      $moonRotation += 0.2;
    }
  });

  onDestroy(() => {
    material.dispose();
  });
</script>

<T.Group {position} rotation.y={Math.atan2(position[0], position[2])}>
  {#if $textOpacity > 0}
    <Text
      text={brand}
      anchorX="center"
      scale={20}
      position={{ x: titleOffsetXY[0], y: titleOffsetXY[1], z: -3 }}
      fillOpacity={$textOpacity}
      font={"fonts/space.woff"}
    />
  {/if}

  <T.Group position.x={planetOffsetXY[0]} position.y={planetOffsetXY[1]}>
    <Label radius={$clonedPlanetSize} text={brand} content={content} {showDetails} opacity={$labelOpacity} />

    <T.Mesh {material} scale={$clonedPlanetSize}>
      <T.SphereGeometry args={[1, 64, 64]} />
    </T.Mesh>

    <!-- Seperate, simpler sphere for interaction. For performance reasons -->
    <T.Mesh let:ref scale={$clonedPlanetSize - 0.1}>
      <InteractiveObject
        object={ref}
        interactive
        on:click={() => {
          activePlanet.set(brand);
          zoomIn(position);
          moonRotation.set($moonRotation - ($moonRotation % (2 * Math.PI)));
          moon1Position.set([-5, -5.8, 0]);
          moon2Position.set([-1, -8.8, 0]);
        }}
        on:pointerenter={() => {
          showDetails = true;
          $scale = 1.2;
        }}
        on:pointerleave={() => {
          showDetails = false;
          $scale = 1;
        }}
      />
      <T.SphereGeometry args={[1, 16, 16]} />
    </T.Mesh>

    <!-- Moons -->
    <T.Group rotation.y={$moonRotation}>
      {#if moon1}
        <T.Group>
          <T.Mesh position={$moon1Position} scale={0.05}>
            <T.SphereGeometry args={[12, 64, 64]} />
            <T.MeshStandardMaterial
              map={moonMaterials[moon1.materialIndex].color}
              normalMap={moonMaterials[moon1.materialIndex].normal}
              displacementMap={moonMaterials[moon1.materialIndex].displace}
            />
          </T.Mesh>
          <T.Group position={$moon1Position}>
            <T.Group rotation.z={-225 * DEG2RAD}>
              <T.Mesh position.y={$moon1Position[0]}>
                <T.CylinderGeometry args={[0.01, 0.01, $moon1Position[0], 32]} />
                <T.MeshBasicMaterial {opacity} transparent={false} />
              </T.Mesh>
            </T.Group>
            <T.Group rotation.z={-90 * DEG2RAD}>
              <T.Mesh position.y={1.5}>
                <T.CylinderGeometry args={[0.01, 0.01, 3, 32]} />
                <T.MeshBasicMaterial {opacity} transparent={false} />
              </T.Mesh>
            </T.Group>
          </T.Group>
        </T.Group>
      {/if}
      {#if moon2}
        <T.Mesh position={$moon2Position} scale={0.05}>
          <T.SphereGeometry args={[12, 64, 64]} />
          <T.MeshStandardMaterial
            map={moonMaterials[moon2.materialIndex].color}
            normalMap={moonMaterials[moon2.materialIndex].normal}
            displacementMap={moonMaterials[moon2.materialIndex].displace}
          />
        </T.Mesh>
      {/if}
    </T.Group>
  </T.Group>

  {#if $zoomedIn && $activePlanet == brand}
    <slot name="content" />
    <slot name="moon1Content" />
    <slot name="moon2Content" />
  {/if}
</T.Group>
