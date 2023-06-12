<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let modalContent: typeof SvelteComponent;
  export let title: { value: string; subTitle?: string } | undefined;
</script>

<button
  on:click|self
  class="top-0 left-0 text-zinc-700 dark:text-zinc-200 absolute w-screen h-screen flex justify-center items-center bg-black/40 z-50 cursor-default"
>
  <div
    class="flex flex-col space-y-4 p-4 rounded-lg w-10/12 lg:w-8/12 xl:w-1/2 text-xs md:text-sm bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-3xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    {#if title}
      <div>
        <h3 class="title-font text-xl font-medium">Select a Category</h3>
        <p>What best describes the item you want to sell?</p>
      </div>
    {/if}
    <div class="h-64 flex flex-col space-y-2">
      <svelte:component this={modalContent} on:click />
    </div>
  </div>
</button>
