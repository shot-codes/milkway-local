<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";
  import type { System } from "$lib/utils";

  export let system: System;
</script>

<div class="w-full h-full fixed">
  <Canvas>
    <Scene {system} />
  </Canvas>
</div>
