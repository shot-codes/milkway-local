<div class="space-y-48 absolute w-[1200px] flex flex-col items-center">
  <div class="text-center space-y-8">
    <div class="text-sm">
      <slot name="title" />
    </div>
    <div class="text-3xl">
      <slot name="description" />
    </div>
  </div>
  <div class="bg-[#232227] rounded-3xl opacity-80 p-24 w-1/2 flex space-x-24">
    <div class="flex-1">
      <img src="/mindfuture.jpeg" alt="Mindfuture" class="w-full" />
    </div>
    <div class="flex-1">
      <slot name="content" />
    </div>
  </div>
</div>
