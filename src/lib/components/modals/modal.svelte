<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  import { fly, slide } from 'svelte/transition';

  export let modalLayout: typeof SvelteComponent;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  on:click|self
  transition:fly
  class="bg-zinc-800/70 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-[99]"
>
  <div
    transition:slide
    class="relative w-full md:w-4/6 lg:1/2 xl:2/5 my-6 mx-auto h-full md:h-auto"
  >
    <div
      class="h-full md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white/95 text-zinc-800 dark:bg-zinc-800/90 backdrop-blur dark:text-zinc-300 outline-none focus:outline-none"
    >
      <svelte:component this={modalLayout} on:click />
    </div>
  </div>
</div>
