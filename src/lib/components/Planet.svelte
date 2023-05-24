<script lang="ts">
  import { T, InteractiveObject, useFrame } from "@threlte/core";
  import { Text } from "@threlte/extras";
  import { zoomIn, Brand } from "$lib/utils";
  import { onDestroy } from "svelte";
  import { spring, tweened, type Tweened } from "svelte/motion";
  import { materials, moonMaterials } from "$lib/materials";
  import { zoomedIn, activePlanet } from "$lib/stores";
  import Label from "./Label.svelte";
  import MoonLabel from "./MoonLabel.svelte";

  interface Moon {
    materialIndex: number;
    position: [number, number, number];
    label: string;
  }

  export let position: [number, number, number];
  export let moonAmount: number;
  export let content = "";
  export let planetSize = 1;
  export let materialIndex = 0;
  export let planetOffsetXY: [number, number];
  export let titleOffsetXY: [number, number];
  export let brand: Brand;
  export let moon1: Moon | undefined = undefined;
  export let moon2: Moon | undefined = undefined;
  export let moon3: Moon | undefined = undefined;
  export let moon4: Moon | undefined = undefined;
  export let moon5: Moon | undefined = undefined;

  const moon1Position: Tweened<[number, number, number]> = tweened([0, 0, 0], { duration: 1000 });
  const moon2Position: Tweened<[number, number, number]> = tweened([0, 0, 0], { duration: 1000 });
  const moon3Position: Tweened<[number, number, number]> = tweened([0, 0, 0], { duration: 1000 });
  const moon4Position: Tweened<[number, number, number]> = tweened([0, 0, 0], { duration: 1000 });
  const moon5Position: Tweened<[number, number, number]> = tweened([0, 0, 0], { duration: 1000 });

  const clonedPlanetSize = spring(planetSize, { stiffness: 0.03, damping: 0.5 });
  const { material } = materials[materialIndex]();
  const lightIntensity = tweened(0, { duration: 1000 });
  const textOpacity = tweened(0, { delay: 500, duration: 200 });
  const labelOpacity = tweened(0, { duration: 100 });
  let moonRotation = tweened(0, { duration: 3000 });

  $: {
    if (moon1) {
      $moon1Position = moon1.position;
    }
    if (moon2) {
      $moon2Position = moon2.position;
    }
    if (moon3) {
      $moon3Position = moon3.position;
    }
    if (moon4) {
      $moon4Position = moon4.position;
    }
    if (moon5) {
      $moon5Position = moon5.position;
    }
  }

  $: {
    if ($zoomedIn && $activePlanet == brand) {
      textOpacity.set(1);
      labelOpacity.set(0);
      clonedPlanetSize.set(2.75);
    } else {
      textOpacity.set(0);
      clonedPlanetSize.set(planetSize);
      if (moon1) {
        $moon1Position = moon1.position;
      }
      if (moon2) {
        $moon2Position = moon2?.position;
      }
      if (moon3) {
        $moon3Position = moon3?.position;
      }
      if (moon4) {
        $moon4Position = moon4?.position;
      }
      if (moon5) {
        $moon5Position = moon5?.position;
      }
    }
  }

  $: {
    if ($zoomedIn) {
      lightIntensity.set(0);
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
    <Label radius={$clonedPlanetSize} text={brand} {content} opacity={$labelOpacity} />

    <T.Mesh {material} scale={$clonedPlanetSize}>
      <T.PointLight intensity={$lightIntensity} />
      <T.SphereGeometry args={[1, 64, 64]} />
    </T.Mesh>

    <!-- Seperate, simpler sphere for interaction. For performance reasons -->
    <T.Mesh let:ref scale={$clonedPlanetSize - 0.1}>
      <InteractiveObject
        object={ref}
        interactive
        on:click={() => {
          activePlanet.set(brand);
          zoomIn(position, moonAmount);
          moonRotation.set($moonRotation - ($moonRotation % (2 * Math.PI)));
          moon1Position.set([-5, -5.3, 0]);
          moon2Position.set([-1.6, -8.3, 0]);
          moon3Position.set([-5, -11.3, 0]);
          moon4Position.set([-1.6, -14.3, 0]);
          moon5Position.set([-5, -17.3, 0]);
        }}
        on:pointerenter={() => {
          if (!$zoomedIn) {
            labelOpacity.set(1);
            lightIntensity.set(5);
            $clonedPlanetSize = planetSize + 1;
          }
        }}
        on:pointerleave={() => {
          if (!$zoomedIn) {
            labelOpacity.set(0);
            lightIntensity.set(0);
            $clonedPlanetSize = planetSize;
          }
        }}
      />
      <T.SphereGeometry args={[1, 16, 16]} />
    </T.Mesh>

    <!-- Moons -->
    <T.Group rotation.y={$moonRotation}>
      {#if moon1}
        <MoonLabel position={$moon1Position} opacity={$labelOpacity} text={moon1.label} />
        <T.Mesh position={$moon1Position} scale={0.05}>
          <T.SphereGeometry args={[12, 64, 64]} />
          <T.MeshStandardMaterial
            map={moonMaterials[moon1.materialIndex].color}
            normalMap={moonMaterials[moon1.materialIndex].normal}
            displacementMap={moonMaterials[moon1.materialIndex].displace}
          />
        </T.Mesh>
      {/if}
      {#if moon2}
        <MoonLabel position={$moon2Position} opacity={$labelOpacity} text={moon2.label} />
        <T.Mesh position={$moon2Position} scale={0.05}>
          <T.SphereGeometry args={[12, 64, 64]} />
          <T.MeshStandardMaterial
            map={moonMaterials[moon2.materialIndex].color}
            normalMap={moonMaterials[moon2.materialIndex].normal}
            displacementMap={moonMaterials[moon2.materialIndex].displace}
          />
        </T.Mesh>
      {/if}
      {#if moon3}
        <MoonLabel position={$moon3Position} opacity={$labelOpacity} text={moon3.label} />
        <T.Mesh position={$moon3Position} scale={0.05}>
          <T.SphereGeometry args={[12, 64, 64]} />
          <T.MeshStandardMaterial
            map={moonMaterials[moon3.materialIndex].color}
            normalMap={moonMaterials[moon3.materialIndex].normal}
            displacementMap={moonMaterials[moon3.materialIndex].displace}
          />
        </T.Mesh>
      {/if}
      {#if moon4}
        <MoonLabel position={$moon4Position} opacity={$labelOpacity} text={moon4.label} />
        <T.Mesh position={$moon4Position} scale={0.05}>
          <T.SphereGeometry args={[12, 64, 64]} />
          <T.MeshStandardMaterial
            map={moonMaterials[moon4.materialIndex].color}
            normalMap={moonMaterials[moon4.materialIndex].normal}
            displacementMap={moonMaterials[moon4.materialIndex].displace}
          />
        </T.Mesh>
      {/if}
      {#if moon5}
        <MoonLabel position={$moon5Position} opacity={$labelOpacity} text={moon5.label} />
        <T.Mesh position={$moon5Position} scale={0.05}>
          <T.SphereGeometry args={[12, 64, 64]} />
          <T.MeshStandardMaterial
            map={moonMaterials[moon5.materialIndex].color}
            normalMap={moonMaterials[moon5.materialIndex].normal}
            displacementMap={moonMaterials[moon5.materialIndex].displace}
          />
        </T.Mesh>
      {/if}
    </T.Group>
  </T.Group>

  <slot name="content" />
  <slot name="moon1Content" />
  <slot name="moon2Content" />
  <slot name="moon3Content" />
  <slot name="moon4Content" />
  <slot name="moon5Content" />
</T.Group>
