<script lang="ts">
  import { activePlanet, zoomedIn } from "$lib/stores";
  import { moonZoomLocations, createPlaneGeometryFromImage } from "$lib/utils";
  import { T } from "@threlte/core";
  import { useTexture } from "@threlte/extras";
  import { spring, tweened } from "svelte/motion";
  import { type ColorRepresentation, Color, PlaneGeometry, MeshStandardMaterial } from "three";
  import { LayerMaterial, Fresnel } from "lamina/vanilla";

  export let index: number;
  export let position: [number, number, number];
  export let parent: string;
  export let title: string;
  export let color: ColorRepresentation;
  export let logoOpacity: number;
  export let logoUrl: string;
  const emissiveRawColor = new Color(color);
  const emissiveColor = spring([0, 0, 0], { stiffness: 0.01, damping: 0.6 });
  let variablePosition = tweened(position, { duration: 1500 });

  let logoGeometry: PlaneGeometry;
  let logoMaterial: MeshStandardMaterial;
  const logo = useTexture(`/logos/moons/${logoUrl}.png`);
  $: {
    if ($logo) {
      logoGeometry = createPlaneGeometryFromImage($logo.image);
      logoMaterial = new MeshStandardMaterial({
        map: $logo,
        transparent: true,
        opacity: logoOpacity,
      });
    }
  }

  const material = new LayerMaterial({
    color: "#000000",
    lighting: "standard",
    layers: [
      new Fresnel({
        color: new Color(color),
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
    if ($zoomedIn && $activePlanet == parent) {
      variablePosition.set(moonZoomLocations[index]);
      emissiveColor.set(emissiveRawColor.toArray());
    }
    if (!$zoomedIn) {
      variablePosition.set(position);
      emissiveColor.set([0, 0, 0]);
    }
  }
</script>

<T.Mesh {material} position={$variablePosition} scale={0.05}>
  {#if logoGeometry && logoMaterial}
    <T.Mesh position={[1, 2.4, 12]} geometry={logoGeometry} material={logoMaterial} scale={20.5} />
  {/if}
  <T.SphereGeometry args={[12, 64, 64]} />
</T.Mesh>
