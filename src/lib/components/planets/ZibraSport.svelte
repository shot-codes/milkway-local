<script lang="ts">
  import { HTML } from "@threlte/extras";
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
  moonAmount={0}
>
  <HTML
    slot="content"
    transform
    position={{ y: 0, x: -2.5 }}
    rotation={{ y: 0 }}
    scale={0.24}
    pointerEvents="none"
  >
    <PlanetContent>
      <span slot="image">
        <img src="/ZibraSport.jpg" alt="" class="w-80 rounded-lg" />
      </span>
      <span slot="description">Zibrasport Equest og Riders NOTEBOOK</span>
      <span slot="content"
        >Zibrasport Equest og Riders NOTEBOOK udgør tilsammen Danmarks bedste digitale ridesports
        community, hvor hesteentusiaster finder alt det bedste indhold til deres passion. Vi laver
        livestreaming og on demand fra de største danske events, masser af video-indhold og skrevne
        artikler, en bloggerportal og udgiver magasinet Riders NOTEBOOK.</span
      >
    </PlanetContent>
  </HTML>
</Planet>
