<script lang="ts">
  export let link = '';
</script>

<div class="bg-[#0b0a0c]/80 absolute w-[600px] rounded-3xl p-12 space-y-12">
  <div class="text-3xl font-semibold text-[#E6534F]">
    <slot name="title" />
  </div>
  <div>
    <slot name="content" />
  </div>
  <div>
    <a href={link} rel="noreferrer" target="_blank" class="flex items-center space-x-4 pointer-events-auto">
      <span>Check them out</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-10 h-10">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
      </svg>     
    </a>
  </div>
</div>
