<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import { Brand, moonLocations } from "$lib/utils";
  import Planet from "$lib/components/Planet.svelte";
  import PlanetContent from "$lib/components/PlanetContent.svelte";
  import Moon1Content from "$lib/components/Moon1Content.svelte";
  import Moon2Content from "$lib/components/Moon2Content.svelte";
  import Moon3Content from "$lib/components/Moon3Content.svelte";
  import Moon4Content from "$lib/components/Moon4Content.svelte";
  import Moon5Content from "$lib/components/Moon5Content.svelte";

  export let position: [number, number, number];
</script>

<Planet
  brand={Brand.MindFuture}
  {position}
  planetSize={2}
  planetOffsetXY={[3, -1]}
  titleOffsetXY={[0, 3.8]}
  materialIndex={2}
  moonAmount={[5]}
  moon1={{ materialIndex: 0, position: moonLocations([5])[0] }}
  moon2={{ materialIndex: 0, position: moonLocations([5])[1] }}
  moon3={{ materialIndex: 0, position: moonLocations([5])[2] }}
  moon4={{ materialIndex: 0, position: moonLocations([5])[3] }}
  moon5={{ materialIndex: 0, position: moonLocations([5])[4] }}
  content="Fra idé til prototype til færdigt produkt"
>
  <HTML
    slot="content"
    transform
    position={{ y: 0, x: -5.5 }}
    rotation={{ y: 5 * DEG2RAD }}
    scale={0.24}
    pointerEvents="none"
  >
    <PlanetContent link="https://mindfuture.com">
      <span slot="image">
        <img src="/Mindfuture.jpg" alt="" class="w-80 rounded-lg" />
      </span>
      <span slot="description">Fra idé til prototype til færdigt produkt</span>
      <span slot="content"><p>I MindFuture støtter vi den innovative idé fra tidlig start til bæredygtig virksomhed med baggrund i et stærkt tech Community, som vi gerne deler ud af.</p> <p>Vi vil være dem, der får ideer og projekter til at lykkes og skaber meningsfulde, positive forskelle for mennesker og samfund.</p></span>
    </PlanetContent>
  </HTML>

  <HTML
    slot="moon1Content"
    transform
    position={{ y: -5, x: -.5 }}
    rotation={{ y: -5 * DEG2RAD }}
    scale={0.24}
    pointerEvents="none"
  >
    <Moon1Content link="https://m2call.com/">
      <span slot="title">M2Call</span>
      <span slot="content">M2Call utilizes artificial intelligence to create new solutions for the healthcare industry by optimizing manual tasks and easing workflow processes. The result is greater mobility for healthcare personnel and improved, safer care for patients.</span>
    </Moon1Content>
  </HTML>

  <HTML
    slot="moon2Content"
    transform
    position={{ y: -8, x: -5 }}
    rotation={{ y: 5 * DEG2RAD }}
    scale={0.24}
    pointerEvents="none"
  >
    <Moon2Content link="https://lifewithartificials.com/">
      <span slot="title">Not for profit Life with Artificials</span>
      <span slot="content">Foreningen Life with Artificials blander kunst og tech og starter debatter omkring mulighederne og dilemmaerne ved nye og kommende teknologier. Vores mission er at debattere en sikker, etisk, bæredygtig og brugbar integration af AI for det enkelte meneske ved at introducere det 18. verdensmål – Life with Artificials.</span>
    </Moon2Content>
  </HTML>
  
  <HTML
    slot="moon3Content"
    transform
    position={{ y: -11, x: -.5 }}
    rotation={{ y: 5 * DEG2RAD }}
    scale={0.24}
    pointerEvents="none"
  >
    <Moon3Content link="https://lifewithartificials.com/">
      <span slot="title">Not for profit Life with Artificials</span>
      <span slot="content">Foreningen Life with Artificials blander kunst og tech og starter debatter omkring mulighederne og dilemmaerne ved nye og kommende teknologier. Vores mission er at debattere en sikker, etisk, bæredygtig og brugbar integration af AI for det enkelte meneske ved at introducere det 18. verdensmål – Life with Artificials.</span>
    </Moon3Content>
  </HTML>
  
  <HTML
    slot="moon4Content"
    transform
    position={{ y: -14, x: -5 }}
    rotation={{ y: 5 * DEG2RAD }}
    scale={0.24}
    pointerEvents="none"
  >
    <Moon4Content link="https://lifewithartificials.com/">
      <span slot="title">Not for profit Life with Artificials</span>
      <span slot="content">Foreningen Life with Artificials blander kunst og tech og starter debatter omkring mulighederne og dilemmaerne ved nye og kommende teknologier. Vores mission er at debattere en sikker, etisk, bæredygtig og brugbar integration af AI for det enkelte meneske ved at introducere det 18. verdensmål – Life with Artificials.</span>
    </Moon4Content>
  </HTML>
  
  <HTML
    slot="moon5Content"
    transform
    position={{ y: -17, x: -.5 }}
    rotation={{ y: 5 * DEG2RAD }}
    scale={0.24}
    pointerEvents="none"
  >
    <Moon5Content link="https://lifewithartificials.com/">
      <span slot="title">Not for profit Life with Artificials</span>
      <span slot="content">Foreningen Life with Artificials blander kunst og tech og starter debatter omkring mulighederne og dilemmaerne ved nye og kommende teknologier. Vores mission er at debattere en sikker, etisk, bæredygtig og brugbar integration af AI for det enkelte meneske ved at introducere det 18. verdensmål – Life with Artificials.</span>
    </Moon5Content>
  </HTML>
</Planet>
