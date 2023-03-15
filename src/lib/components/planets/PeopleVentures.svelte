<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import { Brand } from "$lib/utils";
  import Planet from "$lib/components/Planet.svelte";
  import PlanetContent from "$lib/components/PlanetContent.svelte";

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
>
  <HTML
    slot="content"
    transform
    position={{ y: 0, x: -2.5 }}
    rotation={{ y: 5 * DEG2RAD }}
    scale={0.20}
    pointerEvents="none"
  >
    <PlanetContent link="https://people.ventures/">
      <span slot="image">
        <img src="/PeopleVentures.jpg" alt="" class="w-80 rounded-lg" />
      </span>
      <span slot="description">From pre-seed to venture to expansive growth</span>
      <span slot="content">We back start-ups and founder teams when our operational skillset, experience, and network will bring an original vision to life. From pre-seed to venture to expansive growth with best-in-class founders at every stage of the journey.</span>
    </PlanetContent>
  </HTML>
</Planet>
