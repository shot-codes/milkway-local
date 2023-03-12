<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import { Brand } from "$lib/utils";
  import Planet from "$lib/components/Planet.svelte";
  import PlanetContent from "$lib/components/PlanetContent.svelte";

  export let position: [number, number, number];
</script>

<Planet
  brand={Brand.ZibraTech}
  {position}
  planetSize={3.2}
  planetOffsetXY={[3, -1]}
  titleOffsetXY={[0, 3.8]}
  materialIndex={8}
/>
