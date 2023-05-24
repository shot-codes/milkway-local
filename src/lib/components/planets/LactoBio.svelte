<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { Brand } from "$lib/utils";
  import Planet from "$lib/components/Planet.svelte";
  import PlanetContent from "$lib/components/PlanetContent.svelte";

  export let position: [number, number, number];
</script>

<Planet
  brand={Brand.LactoBio}
  {position}
  planetSize={1.1}
  planetOffsetXY={[3, -1]}
  titleOffsetXY={[0, 3.8]}
  materialIndex={4}
  content="LactoBio info"
  moonAmount={0}
>
  <HTML
    slot="content"
    transform
    position={{ y: 0, x: -5.5 }}
    rotation={{ y: 0 }}
    scale={0.24}
    pointerEvents="none"
  >
    <PlanetContent link="https://lactobio.com" brand={Brand.LactoBio}>
      <span slot="image">
        <img src="/LactoBio.jpg" alt="" class="w-80 rounded-lg" />
      </span>
      <span slot="description">LactoBio info</span>
      <span slot="content"
        >In non anim minim dolore incididunt nulla anim ad consectetur ullamco quis nostrud proident
        nulla ea.</span
      >
    </PlanetContent>
  </HTML>
</Planet>
