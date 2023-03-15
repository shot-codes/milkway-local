<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import { Brand } from "$lib/utils";
  import Planet from "$lib/components/Planet.svelte";
  import PlanetContent from "$lib/components/PlanetContent.svelte";

  export let position: [number, number, number];
</script>

<Planet
  brand={Brand.ZibraFinans}
  {position}
  planetSize={3.5}
  planetOffsetXY={[3, -1]}
  titleOffsetXY={[0, 3.8]}
  materialIndex={3}
  content="Få styr på finanserne i små virksomheder"
>
  <HTML
    slot="content"
    transform
    position={{ y: 0, x: -2.5 }}
    rotation={{ y: 5 * DEG2RAD }}
    scale={0.20}
    pointerEvents="none"
  >
    <PlanetContent link="https://zibrapartner.com">
      <span slot="image">
        <img src="/ZibraFinans.jpg" alt="" class="w-80" />
      </span>
      <span slot="description">Få styr på finanserne i små virksomheder</span>
      <span slot="content">Et spin-off af servicebehovet i de mange selskaber har været en finansfuktion, der kan hjælpe med at få styr på finanserne i små virksomheder. Det er blevet til Confinze.</span>
    </PlanetContent>
  </HTML>
</Planet>
