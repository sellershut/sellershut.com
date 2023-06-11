<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let modalContent: typeof SvelteComponent;
</script>

<button
  on:click|self
  class="top-0 left-0 text-zinc-700 dark:text-zinc-200 absolute w-full h-full flex justify-center items-center bg-black/40 z-50 cursor-default"
>
  <div
    class="fixed max-h-96 h-full p-4 bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-xl w-10/12 md:w-8/12 lg:w-6/12 rounded shadow drop-shadow-sm"
  >
    <svelte:component this={modalContent} on:click />
  </div>
</button>
