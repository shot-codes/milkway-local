<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { Brand } from "$lib/utils";
  import Planet from "$lib/components/planet/Planet2.svelte";
  import PlanetContent from "$lib/components/planet/PlanetContent.svelte";

  export let position: [number, number, number];
</script>

<Planet
  brand={Brand.ZibraPartner}
  {position}
  planetSize={3.5}
  planetOffsetXY={[3, -1]}
  titleOffsetXY={[0, 3.8]}
  color="#74a892"
  content="Få styr på finanserne i små virksomheder"
>
  <HTML slot="content" transform position={[-5.5, 0, 0]} scale={0.34} pointerEvents="none">
    <PlanetContent link="https://zibrapartner.com" brand={Brand.ZibraPartner}>
      <span slot="image">
        <img src="/ZibraPartner.jpg" alt="" class="w-80 rounded-lg" />
      </span>
      <span slot="description">Få styr på finanserne i små virksomheder</span>
      <span slot="content"
        >Et spin-off af servicebehovet i de mange selskaber har været en finansfuktion, der kan
        hjælpe med at få styr på finanserne i små virksomheder. Det er blevet til Confinze.</span
      >
    </PlanetContent>
  </HTML>
</Planet>
