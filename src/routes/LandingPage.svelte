<script lang="ts">
  import { useProgress } from "@threlte/extras";
  import { fade } from "svelte/transition";
  import { tweened } from "svelte/motion";
  import RightArrow from "$lib/components/icons/RightArrow.svelte";
  import Magnifier from "$lib/components/icons/Magnifier.svelte";
  import ClosedHand from "$lib/components/icons/ClosedHand.svelte";
  import ClickingHand from "$lib/components/icons/ClickingHand.svelte";
  import UpRightArrow from "$lib/components/icons/UpRightArrow.svelte";

  let showLandingPage = true;
  const { progress } = useProgress();
  const tweenedProgress = tweened($progress, {
    duration: 800,
  });

  $: tweenedProgress.set($progress);
</script>

{#if $progress != 1}
  <div transition:fade={{ duration: 800 }} class="bg-black absolute inset-0 z-40" />
{/if}

{#if showLandingPage}
  <div
    transition:fade={{ duration: 800 }}
    class="bg-black/80 absolute inset-0 z-50 flex items-center justify-center"
  >
    <div class="space-y-[10vh] text-center">
      <h1
        class="text-[80px] font-semibold bg-gradient-to-r from-[#2C2933] via-[#2C2933] to-[#605D66] bg-clip-text text-transparent leading-normal"
      >
        Velkommen til Zibra Group
      </h1>
      <div>Her er nogle tips til <span class="text-[#DE524E]">oplevelsen</span></div>
      <div class="grid gap-12 grid-cols-2 lg:grid-cols-4">
        <div
          class="flex flex-col items-center justify-center rounded-xl p-8 px-12 max-w-sm space-y-8 text-center bg-[#232227]/80"
        >
          <Magnifier width={65} />
          <div>Tilgå chatbotten i menuen i toppen</div>
        </div>
        <div
          class="flex flex-col items-center justify-center rounded-xl p-8 px-12 max-w-sm space-y-8 text-center bg-[#232227]/80"
        >
          <ClosedHand width={65} />
          <div>Klik og hold med musen, på solsystemet for at trække det rundt</div>
        </div>
        <div
          class="flex flex-col items-center justify-center rounded-xl p-8 px-12 max-w-sm space-y-8 text-center bg-[#232227]/80"
        >
          <ClickingHand width={60} />
          <div>Klik på en planet for at zoome ind på en virksomhed</div>
        </div>
        <div
          class="flex flex-col items-center justify-center rounded-xl p-8 px-12 max-w-sm space-y-8 text-center bg-[#232227]/80"
        >
          <UpRightArrow width={60} />
          <div>Klik på virksomhedens link, for at tilgå deres hjemmeside</div>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center h-64">
        {#if $tweenedProgress < 1}
          <p class="loading">Loading</p>
          <div class="bar-wrapper">
            <div class="bar" style="width: {$tweenedProgress * 100}%" />
          </div>
        {/if}
        {#if $tweenedProgress == 1}
          <button
            class="bg-[#DE524E] rounded-full text-black p-4 px-8 flex items-center space-x-4"
            on:click={() => (showLandingPage = false)}
          >
            <div>Gå på opdagelse</div>
            <div>
              <RightArrow />
            </div>
          </button>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .loading {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .bar-wrapper {
    width: 33.333333%;
    height: 30px;
    border: 1px solid white;
    position: relative;
  }

  .bar {
    height: 100%;
    background-color: white;
  }
</style>
