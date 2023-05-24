<script lang="ts">
  import { T, useFrame, useThrelte, InteractiveObject } from "@threlte/core";
  import { sunMaterial } from "$lib/materials";
  const { material, displace } = sunMaterial();
  import { activePlanet, zoomedIn } from "$lib/stores";
  import { zoomInSun } from "$lib/utils";
  import { tweened } from "svelte/motion";
  import { onMount } from "svelte";
  import { VideoTexture, Group, Vector3 } from "three";
  import { DEG2RAD } from "three/src/math/MathUtils";

  const { camera } = useThrelte();

  const displaceScale = tweened(5);
  const videoOpacity = tweened(0);
  let videoGroup: Group;
  let video: HTMLVideoElement;
  let texture: VideoTexture;

  $: {
    if ($zoomedIn && $activePlanet == "sun") {
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
    if ($displaceScale == 5) videoOpacity.set(0);
    if ($displaceScale == 0) videoOpacity.set(1);
  }

  onMount(() => {
    video = document.getElementById("mf_video") as HTMLVideoElement;
    texture = new VideoTexture(video);
  });

  useFrame(() => {
    // @ts-expect-error The props on displace are not picked up for some reason.
    displace.offset[0] += 0.01;
    displace.offset[1] += 0.01;
    // @ts-expect-error The props on displace are not picked up for some reason.
    displace.offset[2] += 0.01;
  });
</script>

<!-- Sun -->
<T.Mesh {material} let:ref>
  <InteractiveObject
    object={ref}
    interactive
    on:click={() => {
      if (!$zoomedIn) {
        zoomInSun();
      }
    }}
  />
  <T.SphereGeometry args={[6, 64, 64]} />
</T.Mesh>

<!-- Video -->
<T.Group bind:ref={videoGroup}>
  <T.Mesh let:ref rotation.y={-90 * DEG2RAD}>
    <InteractiveObject
      object={ref}
      interactive
      on:click={() => {
        if (!$zoomedIn) {
          zoomInSun();
        }
      }}
    />
    <T.SphereGeometry args={[6.01, 64, 64]} />
    <T.MeshBasicMaterial map={texture} transparent={true} opacity={$videoOpacity} />
  </T.Mesh>
</T.Group>
