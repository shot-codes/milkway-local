<script lang="ts">
  import { HTML } from "@threlte/extras";
  import { Brand, moonLocations } from "$lib/utils";
  import Planet from "$lib/components/Planet.svelte";
  import PlanetContent from "$lib/components/PlanetContent.svelte";
  import MoonContent from "$lib/components/MoonContent.svelte";

  export let position: [number, number, number];
</script>

<Planet
  brand={Brand.MindFuture}
  {position}
  planetSize={2}
  planetOffsetXY={[3, -1]}
  titleOffsetXY={[0, 3.8]}
  materialIndex={2}
  moonAmount={5}
  moon1={{ materialIndex: 0, position: moonLocations(5)[0], label: "M2Call" }}
  moon2={{ materialIndex: 0, position: moonLocations(5)[1], label: "Life with Artificials" }}
  moon3={{ materialIndex: 0, position: moonLocations(5)[2], label: "Mindfuture Hub / Food Lab" }}
  moon4={{ materialIndex: 0, position: moonLocations(5)[3], label: "MindVision" }}
  moon5={{ materialIndex: 0, position: moonLocations(5)[4], label: "Book of Mindsets" }}
  content="Fra idé til prototype til færdigt produkt"
>
  <HTML
    slot="content"
    transform
    position={{ y: 0, x: -5.5 }}
    rotation={{ y: 0 }}
    scale={0.24}
    pointerEvents="none"
  >
    <PlanetContent link="https://mindfuture.com" brand={Brand.MindFuture}>
      <span slot="image">
        <img src="/Mindfuture.jpg" alt="" class="w-80 rounded-lg" />
      </span>
      <span slot="description">Fra idé til prototype til færdigt produkt</span>
      <span slot="content"
        ><p>
          I MindFuture støtter vi den innovative idé fra tidlig start til bæredygtig virksomhed med
          baggrund i et stærkt tech Community, som vi gerne deler ud af.
        </p>
        <p>
          Vi vil være dem, der får ideer og projekter til at lykkes og skaber meningsfulde, positive
          forskelle for mennesker og samfund.
        </p></span
      >
    </PlanetContent>
  </HTML>

  <HTML
    slot="moon1Content"
    transform
    position={{ y: -5, x: -0.5 }}
    rotation={{ y: 0 }}
    scale={0.24}
    pointerEvents="none"
  >
    <MoonContent link="https://m2call.com/" brand={Brand.MindFuture}>
      <span slot="title">M2Call</span>
      <span slot="content"
        >M2Call utilizes artificial intelligence to create new solutions for the healthcare industry
        by optimizing manual tasks and easing workflow processes. The result is greater mobility for
        healthcare personnel and improved, safer care for patients.</span
      >
    </MoonContent>
  </HTML>

  <HTML
    slot="moon2Content"
    transform
    position={{ y: -8, x: -5 }}
    rotation={{ y: 0 }}
    scale={0.24}
    pointerEvents="none"
  >
    <MoonContent link="https://lifewithartificials.com/" brand={Brand.MindFuture}>
      <span slot="title">Not for profit Life with Artificials</span>
      <span slot="content"
        >Foreningen Life with Artificials blander kunst og tech og starter debatter omkring
        mulighederne og dilemmaerne ved nye og kommende teknologier. Vores mission er at debattere
        en sikker, etisk, bæredygtig og brugbar integration af AI for det enkelte meneske ved at
        introducere det 18. verdensmål – Life with Artificials.</span
      >
    </MoonContent>
  </HTML>

  <HTML
    slot="moon3Content"
    transform
    position={{ y: -11, x: -0.5 }}
    rotation={{ y: 0 }}
    scale={0.24}
    pointerEvents="none"
  >
    <MoonContent link="https://lifewithartificials.com/" brand={Brand.MindFuture}>
      <span slot="title">Mindfuture Hub / Food Lab</span>
      <span slot="content"
        >In non anim minim dolore incididunt nulla anim ad consectetur ullamco quis nostrud proident
        nulla ea.</span
      >
    </MoonContent>
  </HTML>

  <HTML
    slot="moon4Content"
    transform
    position={{ y: -14, x: -5 }}
    rotation={{ y: 0 }}
    scale={0.24}
    pointerEvents="none"
  >
    <MoonContent link="https://lifewithartificials.com/" brand={Brand.MindFuture}>
      <span slot="title">MindVision</span>
      <span slot="content"
        >In non anim minim dolore incididunt nulla anim ad consectetur ullamco quis nostrud proident
        nulla ea.</span
      >
    </MoonContent>
  </HTML>

  <HTML
    slot="moon5Content"
    transform
    position={{ y: -17, x: -0.5 }}
    rotation={{ y: 0 }}
    scale={0.24}
    pointerEvents="none"
  >
    <MoonContent link="http://bookofmindsets.dk/" brand={Brand.MindFuture}>
      <span slot="title">Book of Mindsets</span>
      <span slot="content"
        >In non anim minim dolore incididunt nulla anim ad consectetur ullamco quis nostrud proident
        nulla ea.</span
      >
    </MoonContent>
  </HTML>
</Planet>
