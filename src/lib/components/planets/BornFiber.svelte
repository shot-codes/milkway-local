<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import { Brand } from "$lib/utils";
  import Planet from "$lib/components/Planet.svelte";
  import PlanetContent from "$lib/components/PlanetContent.svelte";
  import Moon1Content from "$lib/components/Moon1Content.svelte";
  import Moon2Content from "$lib/components/Moon2Content.svelte";

  export let position: [number, number, number];
</script>

<Planet
  brand={Brand.BornFiber}
  {position}
  planetSize={3}
  planetOffsetXY={[3, -1]}
  titleOffsetXY={[0, 3.8]}
  materialIndex={1}
  moon1={{ materialIndex: 0, position: [4, 0, 0] }}
  moon2={{ materialIndex: 0, position: [-4, 0, 0] }}
>
  <HTML
    slot="content"
    transform
    position={{ y: 0, x: -5 }}
    rotation={{ y: 5 * DEG2RAD }}
    scale={0.15}
    pointerEvents="none"
  >
    <PlanetContent>
      <span slot="title">Network &bull; Est. 2005</span>
      <span slot="description">Yada yada yoda yada</span>
      <span slot="content">Wooooooooooo here we goooooo!</span>
    </PlanetContent>
  </HTML>

  <HTML
    slot="moon1Content"
    transform
    position={{ y: -4.5, x: 0 }}
    rotation={{ y: -5 * DEG2RAD }}
    scale={0.15}
    pointerEvents="none"
  >
    <Moon1Content>
      <span slot="title">Network &bull; Est. 2005</span>
      <span slot="description">Yada yada yoda yada</span>
      <span slot="content">Wooooooooooo here we goooooo!</span>
    </Moon1Content>
  </HTML>

  <HTML
    slot="moon2Content"
    transform
    position={{ y: -7.5, x: -5 }}
    rotation={{ y: 5 * DEG2RAD }}
    scale={0.15}
    pointerEvents="none"
  >
    <Moon2Content>
      <span slot="title">Network &bull; Est. 2005</span>
      <span slot="description">Yada yada yoda yada</span>
      <span slot="content">Wooooooooooo here we goooooo!</span>
    </Moon2Content>
  </HTML>
</Planet>
