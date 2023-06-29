<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { Brand } from "$lib/utils";
  import Planet from "$lib/components/Planet.svelte";
  import PlanetContent from "$lib/components/PlanetContent.svelte";
  import MoonContent from "$lib/components/MoonContent.svelte";

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
  moons={[
    { label: "Motus", texture: "rust" },
    {
      label: "ZibraSport",
      texture: "sandstone",
    },
    {
      label: "ZyberSafe",
      texture: "snow",
    },
  ]}
>
  <HTML slot="content" transform position={[-5.5, 0, 0]} scale={0.24} pointerEvents="none">
    <PlanetContent brand={Brand.ZibraAS}>
      <span slot="image">
        <img src="/ZibraAS.jpg" alt="" class="w-80 rounded-lg" />
      </span>
      <span slot="description">Med fokus på IT – og teknologisektoren</span>
      <span slot="content"
        >Zibra Group (Zibra Holding) er en ejerledet koncern, som består af en række helejede og
        delvist ejede selskaber inden for en bred vifte af brancher, dog med fokus på IT – og
        teknologisektoren. Hos Zibra Group udgør et aktivt familieejerskab nøglen til at udvikle
        vækst-virksomheder med innovative løsninger og en målsætning om at skabe langsigtet værdi og
        en positiv samfundspåvirkning. Det hele med målet om at skabe danske virksomheder, der kan
        skabe eksport og derved være hjørnesten i et dansk velfærdssamfund.</span
      >
    </PlanetContent>
  </HTML>

  <HTML slot="moon1Content" transform position={[-0.5, -5, 0]} scale={0.24} pointerEvents="none">
    <MoonContent brand={Brand.ZibraAS}>
      <span slot="title">Mutos</span>
      <span slot="content"
        >In non anim minim dolore incididunt nulla anim ad consectetur ullamco quis nostrud proident
        nulla ea.</span
      >
    </MoonContent>
  </HTML>

  <HTML slot="moon2Content" transform position={[-5, -8, 0]} scale={0.24} pointerEvents="none">
    <MoonContent brand={Brand.ZibraAS}>
      <span slot="title">ZibraSport</span>
      <span slot="content"
        >In non anim minim dolore incididunt nulla anim ad consectetur ullamco quis nostrud proident
        nulla ea.</span
      >
    </MoonContent>
  </HTML>

  <HTML slot="moon3Content" transform position={[-0.5, -11, 0]} scale={0.24} pointerEvents="none">
    <MoonContent brand={Brand.ZibraAS}>
      <span slot="title">ZyberSafe</span>
      <span slot="content"
        >In non anim minim dolore incididunt nulla anim ad consectetur ullamco quis nostrud proident
        nulla ea.</span
      >
    </MoonContent>
  </HTML>
</Planet>
