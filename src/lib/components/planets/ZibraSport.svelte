<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import { Brand } from "$lib/utils";
  import Planet from "$lib/components/Planet.svelte";
  import PlanetContent from "$lib/components/PlanetContent.svelte";

  export let position: [number, number, number];
</script>

<Planet
  brand={Brand.ZibraSport}
  {position}
  planetSize={1.8}
  planetOffsetXY={[3, -1]}
  titleOffsetXY={[0, 3.8]}
  materialIndex={7}
  content="Zibrasport Equest og Riders NOTEBOOK"
>
  <HTML
    slot="content"
    transform
    position={{ y: 0, x: -2.5 }}
    rotation={{ y: 5 * DEG2RAD }}
    scale={0.20}
    pointerEvents="none"
  >
    <PlanetContent link="https://zibrasport.dk">
      <span slot="description">Zibrasport Equest og Riders NOTEBOOK</span>
      <span slot="content">Zibrasport Equest og Riders NOTEBOOK udgør tilsammen Danmarks bedste digitale ridesports community, hvor hesteentusiaster finder alt det bedste indhold til deres passion. Vi laver livestreaming og on demand fra de største danske events, masser af video-indhold og skrevne artikler, en bloggerportal og udgiver magasinet Riders NOTEBOOK.</span>
    </PlanetContent>
  </HTML>
</Planet>
