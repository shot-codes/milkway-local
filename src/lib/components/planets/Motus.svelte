<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import { Brand } from "$lib/utils";
  import Planet from "$lib/components/Planet.svelte";
  import PlanetContent from "$lib/components/PlanetContent.svelte";

  export let position: [number, number, number];
</script>

<Planet
  brand={Brand.Motus}
  {position}
  planetSize={3}
  planetOffsetXY={[3, -1]}
  titleOffsetXY={[2, 3.8]}
  materialIndex={6}
  content="Motus er specialister i backup"
>
  <HTML
  slot="content"
  transform
  position={{ y: 0, x: -2.5 }}
  rotation={{ y: 5 * DEG2RAD }}
  scale={0.20}
  pointerEvents="none"
  >
    <PlanetContent link="https://motus.dk">
      <span slot="image">
        <img src="/Motus.jpg" alt="" class="w-80 rounded-lg" />
      </span>
      <span slot="description">Motus er specialister i backup</span>
      <span slot="content">Motus er specialister i backup, storage, arkivering og genetablering af IT systemer. Vi hjælper med at fremtidssikre data via rådgivning, løsninger og services, så I til en hver tid har adgang til jeres data, og kan træffe jeres egne beslutninger.</span>
    </PlanetContent>
  </HTML>
</Planet>
