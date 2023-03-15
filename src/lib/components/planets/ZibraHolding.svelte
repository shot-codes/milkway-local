<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import { Brand } from "$lib/utils";
  import Planet from "$lib/components/Planet.svelte";
  import PlanetContent from "$lib/components/PlanetContent.svelte";

  export let position: [number, number, number];
</script>

<Planet
  brand={Brand.ZibraHolding}
  {position}
  planetSize={1.5}
  planetOffsetXY={[3, -1]}
  titleOffsetXY={[0, 3.8]}
  materialIndex={0}
  content="Med fokus på IT – og teknologisektoren"
>
  <HTML
    slot="content"
    transform
    position={{ y: 0, x: -2.5 }}
    rotation={{ y: 5 * DEG2RAD }}
    scale={0.20}
    pointerEvents="none"
  >
    <PlanetContent>
      <span slot="image">
        <img src="/ZibraHolding.jpg" alt="" class="w-80 rounded-lg" />
      </span>
      <span slot="description">Med fokus på IT – og teknologisektoren</span>
      <span slot="content">Zibra Group (Zibra Holding) er en ejerledet koncern, som består af en række helejede og delvist ejede selskaber inden for en bred vifte af brancher, dog med fokus på IT – og teknologisektoren. Hos Zibra Group udgør et aktivt familieejerskab nøglen til at udvikle vækst-virksomheder med innovative løsninger og en målsætning om at skabe langsigtet værdi og en positiv samfundspåvirkning. Det hele med målet om at skabe danske virksomheder, der kan skabe eksport og derved være hjørnesten i et dansk velfærdssamfund.</span>
    </PlanetContent>
  </HTML>
</Planet>