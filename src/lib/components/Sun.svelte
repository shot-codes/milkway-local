<script lang="ts">
  import { T, useFrame, useThrelte } from "@threlte/core";
  import { Float } from "@threlte/extras";
  import { activePlanet, zoomedIn } from "$lib/stores";
  import { zoomInSun } from "$lib/utils";
  import { spring, tweened } from "svelte/motion";
  import { onMount } from "svelte";
  import { VideoTexture, Group, Vector3, Color } from "three";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import Projector from "$lib/assets/models/Projector.svelte";
  import { LayerMaterial, Noise, Displace, Gradient, Fresnel } from "lamina/vanilla";

  const { camera } = useThrelte();

  const displaceScale = tweened(5);
  const videoOpacity = tweened(0);
  const playPauseButtonScale = spring(1);
  let videoGroup: Group;
  let video: HTMLVideoElement;
  let texture: VideoTexture;

  const materialDisplace = new Displace({
    strength: 5,
    scale: 0.1,
    type: "perlin",
    offset: [0.09189000000357626, 0, 0],
    mode: "normal",
    visible: true,
  });

  const materialNoise = new Noise({
    colorA: new Color("#b91c1c"),
    colorB: new Color("#d97706"),
    colorC: new Color("#b91c1c"),
    colorD: new Color("#ef4444"),
    alpha: 0.6,
    scale: 20,
    type: "curl",
    offset: [0, 0, 0],
    mapping: "local",
    mode: "normal",
    visible: true,
  });

  const material = new LayerMaterial({
    color: "#ef4444",
    lighting: "standard",
    alpha: 1,
    layers: [
      materialDisplace,
      materialNoise,
      new Gradient({
        colorA: new Color("#ea580c"),
        colorB: new Color("#ff0000"),
        alpha: 0.4,
        contrast: 1,
        start: 1,
        end: -5,
        axes: "x",
        mapping: "world",
        visible: true,
      }),
      new Fresnel({
        color: new Color("#ff0000"),
        alpha: 0.2,
        power: 1.55,
        intensity: 1.1,
        bias: 0,
        mode: "screen",
        visible: true,
      }),
    ],
  });

  $: {
    if ($zoomedIn && $activePlanet == "Sun") {
      // Show video
      displaceScale.set(0);
      if (video) {
        videoGroup.lookAt(new Vector3($camera.position.x, 0, $camera.position.z));
        video.play();
      }
    } else {
      // Hide video and reset playback
      displaceScale.set(5);
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }
  }

  $: {
    // @ts-expect-error The props on displace are not picked up for some reason.
    materialDisplace.strength = $displaceScale;
  }

  $: {
    if ($displaceScale > 0) videoOpacity.set(0);
    if ($displaceScale == 0) videoOpacity.set(1);
  }

  onMount(() => {
    video = document.getElementById("zg_video") as HTMLVideoElement;
    texture = new VideoTexture(video);
  });

  useFrame(() => {
    // @ts-expect-error The props on displace are not picked up for some reason.
    materialDisplace.offset[0] += 0.02;
    // @ts-expect-error The props on displace are not picked up for some reason.
    materialDisplace.offset[1] += 0.02;
    // @ts-expect-error The props on displace are not picked up for some reason.
    materialDisplace.offset[2] += 0.02;
  });
</script>

<!-- Sun -->
<T.Mesh
  {material}
  on:click={() => {
    if (!$zoomedIn) {
      zoomInSun();
    }
  }}
>
  <T.SphereGeometry args={[6, 64, 64]} />
</T.Mesh>

<!-- Video -->
<T.Group bind:ref={videoGroup}>
  <!-- <T.Mesh let:ref rotation.y={-90 * DEG2RAD}
      on:click={() => {
        if (!$zoomedIn) {
          zoomInSun();
        }
      }}
    >
    <T.SphereGeometry args={[6.01, 64, 64]} />
    <T.MeshBasicMaterial map={texture} transparent={true} opacity={$videoOpacity} />
  </T.Mesh> -->

  <!-- Projector -->
  {#if $zoomedIn && $activePlanet == "Sun"}
    <Float>
      <T.Group position={[-4, 0, 9]} rotation.y={150 * DEG2RAD}>
        <Projector visible={$zoomedIn && $activePlanet == "Sun"} />
      </T.Group>

      <!-- Projector Screen -->/
      <T.Group
        position={[-1, -0.4, 7]}
        rotation.x={90 * DEG2RAD}
        rotation.z={5 * DEG2RAD}
        scale={2}
      >
        <T.Mesh position.y={0.05} rotation.x={-90 * DEG2RAD}>
          <T.PlaneGeometry args={[2.5, 1.4]} />
          <T.MeshBasicMaterial map={texture} transparent={true} opacity={$videoOpacity} />
        </T.Mesh>
      </T.Group>
    </Float>

    <!-- Playback Controls -->
    <Float>
      <T.Mesh
        position={[4, -2, 7]}
        scale={$playPauseButtonScale}
        visible={$zoomedIn && $activePlanet == "Sun"}
        on:pointerenter={() => playPauseButtonScale.set(1.2)}
        on:pointerleave={() => playPauseButtonScale.set(1)}
        on:click={() => {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        }}
      >
        <T.BoxGeometry args={[0.5, 0.5, 0.5]} />
        <T.MeshStandardMaterial color="#303060" />
      </T.Mesh>
    </Float>
  {/if}
</T.Group>
