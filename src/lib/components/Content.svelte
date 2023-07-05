<script lang="ts">
  import { T } from "@threlte/core";
  import { Text } from "@threlte/extras";
  import { tweened } from "svelte/motion";
  import { activePlanet, zoomedIn } from "$lib/stores";

  export let position: [number, number, number];
  export let planet: string;
  export let text: string;

  const opacity = tweened(0, { duration: 2000, delay: 1500 });
  const bgOpacity = tweened(0, { duration: 2000, delay: 0 });

  const setOpacity = (text: number, bg: number, delay: number) => {
    setTimeout(() => {
      console.log("setting opacity");
      opacity.set(text);
      bgOpacity.set(bg);
    }, delay);
  };

  $: {
    if ($zoomedIn && $activePlanet == planet) {
      setOpacity(1, 0.5, 1000);
    }
    if (!$zoomedIn) {
      setOpacity(0, 0.0, 0);
    }
  }
</script>

<T.Group {position}>
  <Text
    scale={0.8}
    position={[-0.9, 0.5, 0]}
    {text}
    anchorX="left"
    anchorY="top"
    overflowWrap="break-word"
    fillOpacity={$opacity}
    maxWidth={2.2}
  />
  <T.Mesh position={[-0.04, 0, -0.1]}>
    <T.PlaneGeometry args={[2.05, 1.3]} />
    <T.MeshStandardMaterial color="#303030" opacity={$bgOpacity} transparent={true} />
  </T.Mesh>
</T.Group>} />
