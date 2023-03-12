<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import Planet from "$lib/components/Planet.svelte";
  import { Brand } from "$lib/utils";
  import PlanetContent from "../PlanetContent.svelte";
  import Moon1Content from "../Moon1Content.svelte";
  import Moon2Content from "../Moon2Content.svelte";
  import { orbitRadius } from "$lib/utils";
</script>

<Planet
  brand={Brand.BornFiber}
  position={[
    orbitRadius * Math.cos((2 * 2 * Math.PI) / 9),
    0,
    orbitRadius * Math.sin((2 * 2 * Math.PI) / 9),
  ]}
  planetSize={3}
  planetOffsetXY={[-2, -1]}
  titleOffsetXY={[-0.5, 4]}
  materialIndex={1}
  moon1={{ material: "#0023bb", position: [4, 0, 0] }}
  moon2={{ material: "#cd3500", position: [-4, 0, 0] }}
>
  <HTML
    slot="content"
    transform
    position={{ y: 0, x: 0 }}
    rotation={{ y: -5 * DEG2RAD }}
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
    position={{ y: -3.5, x: -4 }}
    rotation={{ y: 5 * DEG2RAD }}
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
    position={{ y: -6.5, x: 0 }}
    rotation={{ y: -5 * DEG2RAD }}
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
