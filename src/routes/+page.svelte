<script lang="ts">
  import ZoomOutButton from "$lib/components/ZoomOutButton.svelte";
  import type { ComponentType } from "svelte";
  import { onMount } from "svelte";
  import AudioOn from "$lib/components/icons/AudioOn.svelte";
  import AudioOff from "$lib/components/icons/AudioOff.svelte";
  import LandingPage from "$lib/components/LandingPage.svelte";
  import { dev } from "$app/environment";

  let audio: HTMLAudioElement;
  let threlteRoot: ComponentType;

  let audioPlaying = false;

  onMount(async () => {
    threlteRoot = (await import("$lib/components/ThrelteRoot.svelte")).default;
  });
</script>

{#if !dev}
  <LandingPage />
{/if}

<audio bind:this={audio} loop>
  <source src="/ambience.mp3" type="audio/mpeg" />
</audio>

<button
  class="fixed top-6 right-6 text-white z-30 p-3 rounded-full ring-2 ring-white cursor-pointer"
  on:click={() => {
    audioPlaying = !audioPlaying;
    if (audioPlaying) {
      audio?.play();
    } else {
      audio?.pause();
    }
  }}
>
  {#if audioPlaying}
    <AudioOn />
  {:else}
    <AudioOff />
  {/if}
</button>

<ZoomOutButton />

<svelte:component this={threlteRoot} />
