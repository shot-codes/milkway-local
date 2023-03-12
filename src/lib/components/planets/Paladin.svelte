<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import Planet from "$lib/components/Planet.svelte";
  import { Brand } from "$lib/utils";
  import PlanetContent from "../PlanetContent.svelte";

  export let position: [number, number, number];
</script>

<Planet
  brand={Brand.Paladin}
  {position}
  planetSize={1.8}
  planetOffsetXY={[3, -1]}
  titleOffsetXY={[0.5, 3.8]}
  materialIndex={5}
/>
