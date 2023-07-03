<script lang="ts">
  import { activePlanet, zoomedIn } from "$lib/stores";
  import { moonZoomLocations, type Brand, lightenHexColor } from "$lib/utils";
  import { T } from "@threlte/core";
  import { tweened } from "svelte/motion";
  import { type ColorRepresentation, Color } from "three";
  import { LayerMaterial, Fresnel } from "lamina/vanilla";

  export let index: number;
  export let position: [number, number, number];
  export let parent: string;
  // export let texture: string;
  export let color: ColorRepresentation;
  let variablePosition = tweened(position, { duration: 1500 });

  const material = new LayerMaterial({
    color,
    lighting: "standard",
    layers: [
      new Fresnel({
        color: new Color(lightenHexColor(color as string, 100)),
        alpha: 0.4,
        power: 4.55,
        intensity: 1.1,
        bias: 0,
        mode: "screen",
        visible: true,
      }),
    ],
  });

  $: {
    if ($zoomedIn && $activePlanet == parent) {
      variablePosition.set(moonZoomLocations[index]);
    }
    if (!$zoomedIn) {
      variablePosition.set(position);
    }
  }

  // const textures = useLoader(TextureLoader).load({
  //   map: `/textures/Moons/${texture}/${texture}-diffuse.png`,
  //   normalMap: `/textures/Moons/${texture}/${texture}-normal.png`,
  //   displacementMap: `/textures/Moons/${texture}/${texture}-displace.png`,
  // });
</script>

<T.Mesh {material} position={$variablePosition} scale={0.05}>
  <T.SphereGeometry args={[12, 64, 64]} />
  <!-- <T.MeshStandardMaterial {...$textures} /> -->
</T.Mesh>
