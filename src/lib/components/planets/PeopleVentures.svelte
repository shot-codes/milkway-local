<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { Brand, moonLocations } from "$lib/utils";
  import Planet from "$lib/components/Planet.svelte";
  import PlanetContent from "$lib/components/PlanetContent.svelte";
  import MoonContent from "$lib/components/MoonContent.svelte";

  export let position: [number, number, number];
</script>

<Planet
  brand={Brand.PeopleVentures}
  {position}
  planetSize={1.8}
  planetOffsetXY={[3, -1]}
  titleOffsetXY={[0.5, 3.8]}
  materialIndex={5}
  content="From pre-seed to venture to expansive growth"
  moonAmount={3}
  moon1={{ materialIndex: 0, position: moonLocations(3)[0] }}
  moon2={{ materialIndex: 0, position: moonLocations(3)[1] }}
  moon3={{ materialIndex: 0, position: moonLocations(3)[2] }}
>
  <HTML
    slot="content"
    transform
    position={{ y: 0, x: -5.5 }}
    rotation={{ y: 0 }}
    scale={0.24}
    pointerEvents="none"
  >
    <PlanetContent link="https://people.ventures/" brand={Brand.PeopleVentures}>
      <span slot="image">
        <img src="/PeopleVentures.jpg" alt="" class="w-80 rounded-lg" />
      </span>
      <span slot="description">From pre-seed to venture to expansive growth</span>
      <span slot="content"
        >We back start-ups and founder teams when our operational skillset, experience, and network
        will bring an original vision to life. From pre-seed to venture to expansive growth with
        best-in-class founders at every stage of the journey.</span
      >
    </PlanetContent>
  </HTML>

  <HTML
    slot="moon1Content"
    transform
    position={{ y: -5, x: -0.5 }}
    rotation={{ y: 0 }}
    scale={0.24}
    pointerEvents="none"
  >
    <MoonContent brand={Brand.PeopleVentures}>
      <span slot="title">InQvation</span>
      <span slot="content"
        >In non anim minim dolore incididunt nulla anim ad consectetur ullamco quis nostrud proident
        nulla ea.</span
      >
    </MoonContent>
  </HTML>

  <HTML
    slot="moon2Content"
    transform
    position={{ y: -8, x: -5 }}
    rotation={{ y: 0 }}
    scale={0.24}
    pointerEvents="none"
  >
    <MoonContent brand={Brand.PeopleVentures}>
      <span slot="title">People Ventures Fond</span>
      <span slot="content"
        >In non anim minim dolore incididunt nulla anim ad consectetur ullamco quis nostrud proident
        nulla ea.</span
      >
    </MoonContent>
  </HTML>

  <HTML
    slot="moon3Content"
    transform
    position={{ y: -11, x: -0.5 }}
    rotation={{ y: 0 }}
    scale={0.24}
    pointerEvents="none"
  >
    <MoonContent brand={Brand.PeopleVentures}>
      <span slot="title">Cortrium</span>
      <span slot="content"
        >In non anim minim dolore incididunt nulla anim ad consectetur ullamco quis nostrud proident
        nulla ea.</span
      >
    </MoonContent>
  </HTML>
</Planet>
