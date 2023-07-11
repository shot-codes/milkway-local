<script lang="ts">
  import { T } from "@threlte/core";
  import { Text } from "@threlte/extras";
  import { tweened } from "svelte/motion";
  import { activePlanet, zoomedIn } from "$lib/stores";
  import { goto } from "$app/navigation";

  export let position: [number, number, number];
  export let planet: string;
  export let title: string;
  export let text: string;
  export let url: string;

  const opacity = tweened(0, { duration: 1400, delay: 150 });
  const bgOpacity = tweened(0, { duration: 200, delay: 0 });
  let visible = false;

  const textWidth = 2;
  const numLines = text.length / 55;
  const textHeight = numLines / 8 + 0.8;

  const setOpacity = (text: number, bg: number, delay: number) => {
    setTimeout(() => {
      opacity.set(text);
      bgOpacity.set(bg);
    }, delay);
  };

  $: {
    if ($zoomedIn && $activePlanet == planet) {
      visible = true;
      setOpacity(1, 0.5, 1000);
    }
    if (!$zoomedIn) {
      setOpacity(0, 0.0, 0);
    }
  }
  $: {
    if ($opacity == 0) {
      visible = false;
    }
  }
</script>

{#if visible}
  <T.Group {position}>
    <Text
      scale={1}
      position={[-0.9, textHeight / 2 - 0.1, 0]}
      text={title}
      fillOpacity={$opacity}
      anchorY="top"
      font="/fonts/space.woff"
      color="#FA5244"
    />
    <Text
      scale={0.8}
      position={[-0.9, textHeight / 2 - 0.3, 0]}
      {text}
      overflowWrap="break-word"
      fillOpacity={$opacity}
      maxWidth={textWidth}
    />
    <T.Mesh position={[0, 0, -0.01]}>
      <T.PlaneGeometry args={[textWidth, textHeight]} />
      <T.MeshBasicMaterial color="#303030" opacity={$bgOpacity} transparent={true} />
    </T.Mesh>

    <Text
      scale={0.8}
      position={[-0.9, -textHeight / 2 + 0.3, 0.02]}
      text=" Check them out"
      fillOpacity={$opacity}
      anchorY="top"
      font="/fonts/space.woff"
      on:click={() => goto(url)}
      on:pointerenter={() => {
        document.body.style.cursor = "pointer";
      }}
      on:pointerleave={() => {
        document.body.style.cursor = "default";
      }}
    />

    <!-- <T.Mesh -->
    <!--   position={[-0.55, -textHeight / 2 + 0.25, 0.01]} -->
    <!--   on:click={() => goto(url)} -->
    <!--   on:pointerenter={() => { -->
    <!--     document.body.style.cursor = "pointer"; -->
    <!--   }} -->
    <!--   on:pointerleave={() => { -->
    <!--     document.body.style.cursor = "default"; -->
    <!--   }} -->
    <!-- > -->
    <!--   <T.PlaneGeometry args={[0.8, 0.25]} /> -->
    <!--   <T.MeshBasicMaterial color="#303030" opacity={0} transparent={true} /> -->
    <!-- </T.Mesh> -->
  </T.Group>} />
{/if}
