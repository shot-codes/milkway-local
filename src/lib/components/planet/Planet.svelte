<script lang="ts">
  import { T } from "@threlte/core";
  import { Text } from "@threlte/extras";
  import { spring, tweened } from "svelte/motion";
  import { type Planet, lightenHexColor, zoomIn, generateOrbitPositions } from "$lib/utils";
  import { activePlanet, zoomedIn } from "$lib/stores";
  import { LayerMaterial, Noise, Fresnel } from "lamina/vanilla";
  import { Color } from "three";
  import Label from "./Label.svelte";
  import Moon from "../moon/Moon.svelte";
  import MoonLabel from "../moon/MoonLabel.svelte";

  export let planet: Planet;
  export let position: [number, number, number];

  const planetSize = spring(planet.size, { stiffness: 0.03, damping: 0.5 });
  const emissiveColor = spring([0, 0, 0], { stiffness: 0.01, damping: 0.6 });
  const color = new Color(planet.color);
  const lightColor = lightenHexColor(planet.color, 100);
  const lightIntensity = tweened(0, { duration: 1000 });
  const textOpacity = tweened(0, { delay: 500, duration: 200 });
  const labelOpacity = tweened(0, { duration: 100 });
  const moonRotation = tweened(0, { duration: 3000 });
  const orbitPositions = generateOrbitPositions({
    n: planet.moons.length,
    radius: planet.size + 2.2,
    yMin: -1,
    yMax: 1,
  });

  const material = new LayerMaterial({
    color: planet.color,
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
        color: new Color(lightColor),
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
    // @ts-expect-error The emissive prop isn't picked up by ts
    material.emissive = new Color($emissiveColor[0], $emissiveColor[1], $emissiveColor[2]);
  }

  $: {
    if ($zoomedIn && $activePlanet == planet.title) {
      emissiveColor.set([0, 0, 0]);
      lightIntensity.set(0);
      textOpacity.set(1);
      labelOpacity.set(0);
      planetSize.set(2.75);
    } else {
      textOpacity.set(0);
      planetSize.set(planet.size);
    }
  }
</script>

<T.Group {position} rotation.y={Math.atan2(position[0], position[2])}>
  {#if $textOpacity > 0}
    <Text
      text={planet.title}
      anchorX="center"
      scale={20}
      position={[0, 3.8, -3]}
      fillOpacity={$textOpacity}
      font={"fonts/space.woff"}
    />
  {/if}

  <T.Group position={[3, -1, 0]}>
    <Label
      radius={$planetSize}
      text={planet.title}
      content={planet.content}
      opacity={$labelOpacity}
    />

    <T.Mesh {material} scale={$planetSize}>
      <T.PointLight intensity={$lightIntensity} color={lightColor} />
      <T.SphereGeometry args={[1, 64, 64]} />
    </T.Mesh>

    <!-- Seperate, simpler sphere for interaction. Performance reasons -->
    <T.Mesh
      scale={$planetSize - 0.1}
      on:click={() => {
        activePlanet.set(planet.title);
        zoomIn(position, planet.moons.length);
        moonRotation.set($moonRotation - ($moonRotation % (2 * Math.PI)));
      }}
      on:pointerenter={() => {
        if (!$zoomedIn) {
          labelOpacity.set(1);
          lightIntensity.set(5);
          emissiveColor.set(color.toArray());
          $planetSize = planet.size + 1;
        }
      }}
      on:pointerleave={() => {
        if (!$zoomedIn) {
          labelOpacity.set(0);
          lightIntensity.set(0);
          emissiveColor.set([0, 0, 0]);
          $planetSize = planet.size;
        }
      }}
    >
      <T.SphereGeometry args={[1, 16, 16]} />
    </T.Mesh>
    <!-- Moons -->
    <T.Group rotation.y={$moonRotation}>
      {#each planet.moons as moon, index}
        <MoonLabel position={orbitPositions[index]} opacity={$labelOpacity} text={moon.title} />
        <Moon position={orbitPositions[index]} {index} parent={planet.title} color={planet.color} />
      {/each}
    </T.Group>
  </T.Group>
</T.Group>
