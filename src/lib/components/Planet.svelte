<script lang="ts">
  import { T, useFrame } from "@threlte/core";
  import { Text } from "@threlte/extras";
  import { zoomIn, Brand } from "$lib/utils";
  import { onDestroy } from "svelte";
  import { spring, tweened } from "svelte/motion";
  import { moonLocations, lightenHexColor } from "$lib/utils";
  import { zoomedIn, activePlanet } from "$lib/stores";
  import Label from "./Label.svelte";
  import MoonLabel from "./MoonLabel.svelte";
  import Moon from "./Moon.svelte";
  import { Color, type ColorRepresentation } from "three";
  import { LayerMaterial, Noise, Fresnel } from "lamina/vanilla";

  interface MoonInterface {
    label: string;
    texture: string;
  }

  export let position: [number, number, number];
  export let content = "";
  export let planetSize = 1;
  export let planetOffsetXY: [number, number];
  export let titleOffsetXY: [number, number];
  export let brand: Brand;
  export let moons: Array<MoonInterface> = [];
  export let color: ColorRepresentation;

  const colorObj = new Color(color);
  const orbitPositions = moons.map((_, i) => {
    return moonLocations(moons.length)[i];
  });
  const clonedPlanetSize = spring(planetSize, { stiffness: 0.03, damping: 0.5 });
  const emissiveColor = spring([0, 0, 0], { stiffness: 0.01, damping: 0.6 });
  const lightColor = lightenHexColor(color as string, 100);
  const lightIntensity = tweened(0, { duration: 1000 });
  const textOpacity = tweened(0, { delay: 500, duration: 200 });
  const labelOpacity = tweened(0, { duration: 100 });
  let moonRotation = tweened(0, { duration: 3000 });

  const material = new LayerMaterial({
    color,
    lighting: "standard",
    layers: [
      new Noise({
        colorA: new Color("#aaaaaa"),
        colorB: new Color("#aaaaaa"),
        colorC: new Color("#000000"),
        colorD: new Color("#000000"),
        alpha: 0.1,
        scale: 30,
        type: "curl",
        offset: [0, 0, 0],
        mapping: "local",
        mode: "normal",
        visible: true,
      }),
      new Fresnel({
        color: new Color(lightenHexColor(color as string, 100)),
        alpha: 0.4,
        power: 1.55,
        intensity: 1.1,
        bias: 0,
        mode: "screen",
        visible: true,
      }),
    ],
  });

  $: {
    if ($zoomedIn && $activePlanet == brand) {
      emissiveColor.set([0, 0, 0]);
      textOpacity.set(1);
      labelOpacity.set(0);
      clonedPlanetSize.set(2.75);
    } else {
      textOpacity.set(0);
      clonedPlanetSize.set(planetSize);
    }
  }

  $: {
    // @ts-expect-error The emissive prop isn't picked up by ts
    material.emissive = new Color($emissiveColor[0], $emissiveColor[1], $emissiveColor[2]);
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
      position={[titleOffsetXY[0], titleOffsetXY[1], -3]}
      fillOpacity={$textOpacity}
      font={"fonts/space.woff"}
    />
  {/if}

  <T.Group position.x={planetOffsetXY[0]} position.y={planetOffsetXY[1]}>
    <Label radius={$clonedPlanetSize} text={brand} {content} opacity={$labelOpacity} />

    <T.Mesh {material} scale={$clonedPlanetSize}>
      <T.PointLight intensity={$lightIntensity} color={lightColor} />
      <T.SphereGeometry args={[1, 64, 64]} />
    </T.Mesh>

    <!-- Seperate, simpler sphere for interaction. For performance reasons -->
    <T.Mesh
      scale={$clonedPlanetSize - 0.1}
      on:click={() => {
        activePlanet.set(brand);
        zoomIn(position, moons.length);
        moonRotation.set($moonRotation - ($moonRotation % (2 * Math.PI)));
      }}
      on:pointerenter={() => {
        if (!$zoomedIn) {
          labelOpacity.set(1);
          lightIntensity.set(5);
          emissiveColor.set(colorObj.toArray());
          $clonedPlanetSize = planetSize + 1;
        }
      }}
      on:pointerleave={() => {
        if (!$zoomedIn) {
          labelOpacity.set(0);
          lightIntensity.set(0);
          emissiveColor.set([0, 0, 0]);
          $clonedPlanetSize = planetSize;
        }
      }}
    >
      <T.SphereGeometry args={[1, 16, 16]} />
    </T.Mesh>

    <!-- Moons -->
    <T.Group rotation.y={$moonRotation}>
      {#each moons as moon, index}
        <MoonLabel position={orbitPositions[index]} opacity={$labelOpacity} text={moon.label} />
        <Moon position={orbitPositions[index]} {index} parent={brand} {color} />
      {/each}
    </T.Group>
  </T.Group>

  <slot name="content" />
  <slot name="moon1Content" />
  <slot name="moon2Content" />
  <slot name="moon3Content" />
  <slot name="moon4Content" />
  <slot name="moon5Content" />
</T.Group>
