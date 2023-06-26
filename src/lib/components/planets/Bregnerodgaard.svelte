<script lang="ts">
  import { T, useFrame } from "@threlte/core";
  import { HTML, GLTF, Float } from "@threlte/extras";
  import { Brand } from "$lib/utils";
  import Planet from "$lib/components/Planet.svelte";
  import PlanetContent from "$lib/components/PlanetContent.svelte";
  import { Vector3 } from "three";

  export let position: [number, number, number];
  const planetOffsetXY: [number, number] = [3, -1];

  let numHorses = 5;
  let horsePositions: Array<Vector3> = [];
  for (let i = 0; i < numHorses; i++) {
    horsePositions[i] = new Vector3(
      5 * Math.cos(((i + 1) * 2 * Math.PI) / numHorses),
      0,
      5 * Math.sin(((i + 1) * 2 * Math.PI) / numHorses)
    );
  }

  let horseRotations: Array<number> = [];
  for (let i = 0; i < numHorses; i++) {
    horseRotations[i] = i * ((2 * Math.PI) / numHorses);
  }

  let horseRotation = 0;

  useFrame(() => {
    horseRotation -= 0.003;
  });
</script>

<T.Group {position}>
  <T.Group
    position.z={-planetOffsetXY[0]}
    position.y={planetOffsetXY[1]}
    rotation.y={horseRotation}
  >
    {#each horsePositions as horsePosition, i}
      <Float
        position={[horsePosition.x, horsePosition.y, horsePosition.z]}
        speed={3}
        floatIntensity={3}
        rotationIntensity={3}
        floatingRange={[-10, 10]}
      >
        <T.Group rotation.y={-horseRotations[i] - 1.2}>
          <GLTF url={"/models/Horse.glb"} scale={0.005} ignorePointer />
        </T.Group>
      </Float>
    {/each}
  </T.Group>
</T.Group>

<Planet
  brand={Brand.Bregnerødgård}
  {position}
  planetSize={3}
  {planetOffsetXY}
  titleOffsetXY={[0, 3.8]}
  materialIndex={6}
  content="Anna Zibrandtsen"
  moonAmount={0}
>
  <HTML slot="content" transform position={[-5.5, 0, 0]} scale={0.24} pointerEvents="none">
    <PlanetContent
      link="https://instagram.com/annazibrandtsen?igshid=MmJiY2I4NDBkZg=="
      brand={Brand.Bregnerødgård}
    >
      <span slot="image">
        <img src="/Bregneroodgaard.jpg" alt="" class="w-80 rounded-lg" />
      </span>
      <span slot="description">Bregnerødgård</span>
      <span slot="content"
        ><p>
          Anna Zibrandtsen er en stjerne på vej i dansk seniordressur. Med hingsten Arlando var hun
          en del af sølvholdet ved EM i Göteborg 2017 og opnåede en individuel 6. plads i Grand Prix
          Kür ved samme mesterskab.
        </p>
        <p>
          Anna Zibrandtsen (f. 1994) har i mange år været en del af dansk dressur. Anna har
          repræsenteret det danske landshold, både som junior, ungrytter og U25 og har mange flotte
          resultater bag sig. Desuden fik Anna i 2011 prisen for Årets Talent i dansk dressur.
        </p></span
      >
    </PlanetContent>
  </HTML>
</Planet>
