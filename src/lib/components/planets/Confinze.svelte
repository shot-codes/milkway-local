<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import { Brand } from "$lib/utils";
  import Planet from "$lib/components/Planet.svelte";
  import PlanetContent from "$lib/components/PlanetContent.svelte";

  export let position: [number, number, number];
</script>

<Planet
  brand={Brand.Confinze}
  {position}
  planetSize={3}
  planetOffsetXY={[3, -1]}
  titleOffsetXY={[0, 3.8]}
  materialIndex={1}
  content="Confinze er en finance-as-a-service provider"
  moonAmount={[1]}
>
<HTML
    slot="content"
    transform
    position={{ y: 0, x: -5.5 }}
    rotation={{ y: 0 }}
    scale={0.24}
    pointerEvents="none"
  >
    <PlanetContent link="https://www.confinze.io/">
      <span slot="image">
        <img src="/Confinze.jpg" alt="" class="w-80 rounded-lg" />
      </span>
      <span slot="description">Finance-as-a-service provider</span>
      <span slot="content"><p>Confinze er en finance-as-a-service provider specifikt målrettet start-up og scale-up selskaber.</p><p> Med vores forretningsmodelstilpasset platform- og service koncept, skaber vi gennemsigtighed i den finansielle performance også kaldet Business Intelligence hvilket giver vores kunder mulighed for bedre strategiske og mere værdiskabende beslutninger.</p></span>
    </PlanetContent>
  </HTML>
</Planet>
