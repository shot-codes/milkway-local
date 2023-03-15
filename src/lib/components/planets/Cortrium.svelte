<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import { Brand } from "$lib/utils";
  import Planet from "$lib/components/Planet.svelte";
  import PlanetContent from "$lib/components/PlanetContent.svelte";

  export let position: [number, number, number];
</script>

<Planet
  brand={Brand.Cortrium}
  {position}
  planetSize={3.2}
  planetOffsetXY={[3, -1]}
  titleOffsetXY={[0, 3.8]}
  materialIndex={8}
  content="Cortrium is a Danish med-tech company"
>
  <HTML
  slot="content"
  transform
  position={{ y: 0, x: -2.5 }}
  rotation={{ y: 5 * DEG2RAD }}
  scale={0.20}
  pointerEvents="none"
  >
    <PlanetContent link="https://www.cortrium.com/">
      <span slot="image">
        <img src="/Cortrium.jpg" alt="" class="w-80 rounded-lg" />
      </span>
      <span slot="description">Cortrium is a Danish med-tech company</span>
      <span slot="content">Cortrium is a Danish med-tech company, producing state of the art medically certified ambulatory ECG monitors. We deliver open and easily accessible devices integrating with both stand alone and cloud-based analysis software.</span>
    </PlanetContent>
  </HTML>
</Planet>
