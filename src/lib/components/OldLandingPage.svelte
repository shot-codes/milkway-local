<script lang="ts">
  import { fade } from "svelte/transition";
  let showLoadingPage = true;
</script>

{#if showLoadingPage}
  <div
    transition:fade={{ duration: 800 }}
    class="bg-black fixed inset-0 z-50 flex items-center justify-center"
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
          <img src="/3.svg" alt="" class="w-12" />
          <div>Tilgå chatbotten i menuen i toppen</div>
        </div>
        <div
          class="flex flex-col items-center justify-center rounded-xl p-8 px-12 max-w-sm space-y-8 text-center bg-[#232227]/80"
        >
          <img src="/2.svg" alt="" class="w-12" />
          <div>Klik og hold med musen, på solsystemet for at trække det rundt</div>
        </div>
        <div
          class="flex flex-col items-center justify-center rounded-xl p-8 px-12 max-w-sm space-y-8 text-center bg-[#232227]/80"
        >
          <img src="/1.svg" alt="" class="w-12" />
          <div>Klik på en planet for at zoome ind på en virksomhed</div>
        </div>
        <div
          class="flex flex-col items-center justify-center rounded-xl p-8 px-12 max-w-sm space-y-8 text-center bg-[#232227]/80"
        >
          <img src="/4.svg" alt="" class="w-12" />
          <div>Klik på virksomhedens link, for at tilgå deres hjemmeside</div>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <button
          class="bg-[#DE524E] rounded-full text-black p-4 px-8 flex items-center space-x-4"
          on:click={() => (showLoadingPage = false)}
        >
          <div>Gå på opdagelse</div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
{/if}
