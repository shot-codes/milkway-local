<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import { Brand, moonLocations } from "$lib/utils";
  import Planet from "$lib/components/Planet.svelte";
  import PlanetContent from "$lib/components/PlanetContent.svelte";
  import Moon1Content from "$lib/components/Moon1Content.svelte";
  import Moon2Content from "$lib/components/Moon2Content.svelte";
  import Moon3Content from "$lib/components/Moon3Content.svelte";

  export let position: [number, number, number];
</script>

<Planet
  brand={Brand.ZibraAS}
  {position}
  planetSize={1.5}
  planetOffsetXY={[3, -1]}
  titleOffsetXY={[0, 3.8]}
  materialIndex={0}
  content="Med fokus på IT – og teknologisektoren"
  moonAmount={[3]}
  moon1={{ materialIndex: 0, position: moonLocations([3])[0] }}
  moon2={{ materialIndex: 0, position: moonLocations([3])[1] }}
  moon3={{ materialIndex: 0, position: moonLocations([3])[2] }}
>
  <HTML
    slot="content"
    transform
    position={{ y: 0, x: -5.5 }}
    rotation={{ y: 0 }}
    scale={0.24}
    pointerEvents="none"
  >
    <PlanetContent>
      <span slot="image">
        <img src="/ZibraAS.jpg" alt="" class="w-80 rounded-lg" />
      </span>
      <span slot="description">Med fokus på IT – og teknologisektoren</span>
      <span slot="content">Zibra Group (Zibra Holding) er en ejerledet koncern, som består af en række helejede og delvist ejede selskaber inden for en bred vifte af brancher, dog med fokus på IT – og teknologisektoren. Hos Zibra Group udgør et aktivt familieejerskab nøglen til at udvikle vækst-virksomheder med innovative løsninger og en målsætning om at skabe langsigtet værdi og en positiv samfundspåvirkning. Det hele med målet om at skabe danske virksomheder, der kan skabe eksport og derved være hjørnesten i et dansk velfærdssamfund.</span>
    </PlanetContent>
  </HTML>

  <HTML
    slot="moon1Content"
    transform
    position={{ y: -5, x: -.5 }}
    rotation={{ y: 0 }}
    scale={0.24}
    pointerEvents="none"
  >
    <Moon1Content>
      <span slot="title">Mutos</span>
      <span slot="content">In non anim minim dolore incididunt nulla anim ad consectetur ullamco quis nostrud proident nulla ea.</span>
    </Moon1Content>
  </HTML>

  <HTML
    slot="moon2Content"
    transform
    position={{ y: -8, x: -5 }}
    rotation={{ y: 0 }}
    scale={0.24}
    pointerEvents="none"
  >
    <Moon2Content>
      <span slot="title">ZibraSport</span>
      <span slot="content">In non anim minim dolore incididunt nulla anim ad consectetur ullamco quis nostrud proident nulla ea.</span>
    </Moon2Content>
  </HTML>
  
  <HTML
    slot="moon3Content"
    transform
    position={{ y: -11, x: -.5 }}
    rotation={{ y: 0 }}
    scale={0.24}
    pointerEvents="none"
  >
    <Moon3Content>
      <span slot="title">ZyberSafe</span>
      <span slot="content">In non anim minim dolore incididunt nulla anim ad consectetur ullamco quis nostrud proident nulla ea.</span>
    </Moon3Content>
  </HTML>
</Planet>