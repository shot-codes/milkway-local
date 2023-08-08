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
  import { LayerMaterial, Noise, Displace, Fresnel } from "lamina/vanilla";

  const { camera } = useThrelte();

  const displaceScale = spring(5, { stiffness: 0.03, damping: 0.3 });
  const videoOpacity = tweened(0);
  const playButtonScale = spring(1);
  const pauseButtonScale = spring(1);
  const restartButtonScale = spring(1);
  const playButtonColor = new Color(0.05, 0.05, 0.05);
  const pauseButtonColor = new Color(0.05, 0.05, 0.05);
  const restartButtonColor = new Color(0.05, 0.05, 0.05);
  const lightIntensity = tweened(0);
  const emissiveColor = spring([0, 0, 0], { stiffness: 0.01, damping: 0.6 });
  let videoGroup: Group;
  let video: HTMLVideoElement;
  let texture: VideoTexture;

  const materialDisplace = new Displace({
    strength: 5,
    scale: 0.15,
    type: "perlin",
    offset: [0, 0, 0],
    mode: "normal",
    visible: true,
  });
  const materialNoise = new Noise({
    colorA: new Color("#000000"),
    colorB: new Color("#080808"),
    colorC: new Color("#606060"),
    colorD: new Color("#808080"),
    scale: 0.5,
    type: "curl",
    offset: [0, 0, 0],
    mode: "normal",
    visible: true,
    mapping: "local",
  });

  const material = new LayerMaterial({
    color: "#ffffff",
    lighting: "standard",
    layers: [
      materialNoise,
      materialDisplace,
      new Fresnel({
        color: new Color("#909090"),
        alpha: 0.9,
        power: 2.5,
        intensity: 1.5,
        bias: 0,
        mode: "normal",
        visible: true,
      }),
    ],
  });

  $: {
    // @ts-expect-error The emissive prop isn't picked up by ts
    material.emissive = new Color($emissiveColor[0], $emissiveColor[1], $emissiveColor[2]);
  }

  $: {
    if ($zoomedIn && $activePlanet == "Sun") {
      // Show video
      displaceScale.set(0);
      if (video && videoGroup) {
        videoGroup.lookAt(new Vector3($camera.position.x, 0, $camera.position.z));
        video.play();
      }
    } else {
      // Hide video and reset playback
      displaceScale.set(4);
      videoOpacity.set(0);
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
  on:pointerenter={() => {
    if (!$zoomedIn) {
      displaceScale.set(0);
      lightIntensity.set(4);
      emissiveColor.set([0.1, 0.1, 0.1]);
    }
  }}
  on:pointerleave={() => {
    if (!$zoomedIn) {
      displaceScale.set(4);
    }
    lightIntensity.set(0);
    emissiveColor.set([0, 0, 0]);
  }}
  on:click={() => {
    if (!$zoomedIn) {
      zoomInSun();
      lightIntensity.set(0);
      videoOpacity.set(1);
    }
  }}
>
  <T.SphereGeometry args={[4, 64, 64]} />
</T.Mesh>

<!-- Light -->
<T.PointLight intensity={$lightIntensity} color="#ffffff" />

{#if $zoomedIn && $activePlanet == "Sun"}
  <!-- Video -->
  <T.Group bind:ref={videoGroup}>
    <T.Mesh rotation.y={-90 * DEG2RAD}>
      <T.SphereGeometry args={[4.05, 64, 64, 2.2, 1.9, 1, 1]} />
      <T.MeshBasicMaterial map={texture} transparent={true} opacity={$videoOpacity} />
    </T.Mesh>

    <!-- Projector -->
    <Float>
      <T.Group position={[-2, 0, 9]} rotation.y={150 * DEG2RAD}>
        <Projector visible={$zoomedIn && $activePlanet == "Sun"} />
      </T.Group>
    </Float>

    <!-- Playback Controls -->
    <Float
      position={[0, -2, 5]}
      floatingRange={[-0.0005, 0.0005]}
      rotationIntensity={1}
      rotationSpeed={1}
      floatIntensity={1}
      speed={1}
      seed={0}
    >
      <T.Mesh
        scale={$playButtonScale}
        visible={$zoomedIn && $activePlanet == "Sun"}
        on:pointerenter={() => playButtonScale.set(1.2)}
        on:pointerleave={() => playButtonScale.set(1)}
        on:click={() => {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        }}
      >
        <T.BoxGeometry args={[0.5, 0.5, 0.5]} />
        <T.MeshStandardMaterial color={playButtonColor} />
      </T.Mesh>
    </Float>

    <Float
      position={[-1, -2, 5]}
      floatingRange={[-0.0005, 0.0005]}
      rotationIntensity={1}
      rotationSpeed={1}
      floatIntensity={1}
      speed={1}
      seed={134}
    >
      <T.Mesh
        scale={$restartButtonScale}
        visible={$zoomedIn && $activePlanet == "Sun"}
        on:pointerenter={() => restartButtonScale.set(1.2)}
        on:pointerleave={() => restartButtonScale.set(1)}
        on:click={() => {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        }}
      >
        <T.BoxGeometry args={[0.5, 0.5, 0.5]} />
        <T.MeshStandardMaterial color={restartButtonColor} />
      </T.Mesh>
    </Float>

    <Float
      position={[1, -2, 5]}
      floatingRange={[-0.0005, 0.0005]}
      rotationIntensity={1}
      rotationSpeed={1}
      floatIntensity={1}
      speed={1}
      seed={434}
    >
      <T.Mesh
        scale={$pauseButtonScale}
        visible={$zoomedIn && $activePlanet == "Sun"}
        on:pointerenter={() => {
          pauseButtonScale.set(1.2);
          pauseButtonColor.r = 1;
        }}
        on:pointerleave={() => pauseButtonScale.set(1)}
        on:click={() => {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        }}
      >
        <T.BoxGeometry args={[0.5, 0.5, 0.5]} />
        <T.MeshStandardMaterial color={pauseButtonColor} />
      </T.Mesh>
    </Float>
  </T.Group>
{/if}
