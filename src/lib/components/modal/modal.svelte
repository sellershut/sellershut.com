<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let modalContent: typeof SvelteComponent;
  export let title: { value: string; subTitle?: string } | undefined;
</script>

<button
  on:click|self
  class="text-zinc-700 dark:text-zinc-200 fixed inset-0 outline-none focus:outline-none flex justify-center items-center bg-black/40 z-50 cursor-default backdrop-blur-sm overflow-x-hidden overflow-y-auto w-full"
>
  <div
    class="rounded-lg text-xs md:text-sm backdrop-blur-3xl relative w-full md:w-2/3 lg:w-1/2 xl:w-2/5 my-6 mx-auto md:h-auto"
  >
    <div
      class="h-full md:h-auto border-0 rounded-lg shadow-lg bg-zinc-50/80 dark:bg-zinc-950/80 relative flex flex-col w-full outline-none focus:outline-none"
    >
      {#if title}
        <div
          class="dark:bg-zinc-950/95 bg-zinc-300 rounded shadow drop-shadow p-2"
        >
          <h3 class="title-font text-xl font-bold">{title.value}</h3>
          {#if title.subTitle}
            <p class="text-zinc-600 dark:text-zinc-400">{title.subTitle}</p>
          {/if}
        </div>
      {/if}
      <div class="relative p-6 flex-auto">
        <svelte:component this={modalContent} on:click />
      </div>
    </div>
  </div>
</button>
