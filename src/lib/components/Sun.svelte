<script lang="ts">
  import { T, useFrame, useThrelte } from "@threlte/core";
  import { Float, GLTF } from "@threlte/extras";
  import { sunMaterial } from "$lib/materials";
  const { material, displace } = sunMaterial();
  import { activePlanet, zoomedIn } from "$lib/stores";
  import { zoomInSun } from "$lib/utils";
  import { spring, tweened } from "svelte/motion";
  import { onMount } from "svelte";
  import { VideoTexture, Group, Vector3 } from "three";
  import { DEG2RAD } from "three/src/math/MathUtils";
  import Projector from "$lib/assets/models/Projector.svelte";

  const { camera } = useThrelte();

  const displaceScale = tweened(5);
  const videoOpacity = tweened(0);
  const playPauseButtonScale = spring(1);
  let videoGroup: Group;
  let video: HTMLVideoElement;
  let texture: VideoTexture;

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
    displace.strength = $displaceScale;
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
    displace.offset[0] += 0.01;
    // @ts-expect-error The props on displace are not picked up for some reason.
    displace.offset[1] += 0.01;
    // @ts-expect-error The props on displace are not picked up for some reason.
    displace.offset[2] += 0.01;
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
