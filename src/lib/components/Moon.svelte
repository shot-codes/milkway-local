<script lang="ts">
  import { activePlanet, zoomedIn } from "$lib/stores";
  import { moonZoomLocations, type Brand } from "$lib/utils";
  import { T, useLoader } from "@threlte/core";
  import { tweened } from "svelte/motion";
  import { TextureLoader } from "three";

  export let index: number;
  export let position: [number, number, number];
  export let parent: Brand;
  export let texture: string;

  let variablePosition = tweened(position, { duration: 1500 });

  $: {
    if ($zoomedIn && $activePlanet == parent) {
      variablePosition.set(moonZoomLocations[index]);
    }
    if (!$zoomedIn) {
      variablePosition.set(position);
    }
  }

  const textures = useLoader(TextureLoader).load({
    map: `/textures/Moons/${texture}/${texture}-diffuse.png`,
    normalMap: `/textures/Moons/${texture}/${texture}-normal.png`,
    displacementMap: `/textures/Moons/${texture}/${texture}-displace.png`,
  });
</script>

{#if $textures}
  <T.Mesh position={$variablePosition} scale={0.05}>
    <T.SphereGeometry args={[12, 64, 64]} />
    <T.MeshStandardMaterial {...$textures} />
  </T.Mesh>
{/if}
