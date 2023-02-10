<script lang="ts">
  import { T } from "@threlte/core";
  import { WebGLRenderer, Clock } from "three";
  import { onDestroy } from "svelte";
  import { sunMaterial } from "$lib/materials";

  export let position: [number, number, number];

  const { material, g, gu } = sunMaterial();

  let renderer = new WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);

  document.body.appendChild(renderer.domElement);

  window.addEventListener("resize", () => {
    renderer.setSize(innerWidth, innerHeight);
  });

  let clock = new Clock();

  renderer.setAnimationLoop(() => {
    let t = clock.getElapsedTime() * 0.5;
    gu.time.value = t * Math.PI;
  });

  onDestroy(() => {
    material.dispose();
  });
</script>

<!-- SUN -->
<T.Group {position}>
  <T.Mesh {material}>
    <T.Points geometry={g} {material} />
  </T.Mesh>
</T.Group>
