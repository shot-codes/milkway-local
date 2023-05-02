<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import { Brand } from "$lib/utils";
  import Planet from "$lib/components/Planet.svelte";
  import PlanetContent from "$lib/components/PlanetContent.svelte";

  export let position: [number, number, number];
</script>

<Planet
  brand={Brand.LactoBio}
  {position}
  planetSize={0.5}
  planetOffsetXY={[3, -1]}
  titleOffsetXY={[0, 3.8]}
  materialIndex={4}
  content="LactoBio sikrer en sikker kommunikation"
  moonAmount={[1]}
>
  <HTML
    slot="content"
    transform
    position={{ y: 0, x: -5.5 }}
    rotation={{ y: 5 * DEG2RAD }}
    scale={0.24}
    pointerEvents="none"
  >
    <PlanetContent link="https://lactobio.com">
      <span slot="image">
        <img src="/LactoBio.jpg" alt="" class="w-80 rounded-lg" />
      </span>
      <span slot="description">ZyberSafe sikrer en sikker kommunikation</span>
      <span slot="content">ZyberSafe opstod I forbindelse med en stor international politisk debat om sikkerhed i fiberbaserede telekommunikationsnet og produkterne adresserer denne udfordring. ZyberSafe er dansk udviklet og produceret, og sikrer at kommunikation kan foregå uden frygt for data indbrud via teleselskaber eller anden ekstern infrastruktur.</span>
    </PlanetContent>
  </HTML>
</Planet>
