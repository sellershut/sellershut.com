<script lang="ts">
  import type { Category } from '$lib/@types/category';
  import { createEventDispatcher } from 'svelte';
  import type { SvelteComponent } from 'svelte';
  import { scale } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  export let category: Category;
  export let icon: typeof SvelteComponent | undefined;
  export let pos: number;
</script>

<button
  in:scale={{ duration: pos * 35 }}
  class="border transition w-full border-zinc-300 dark:border-zinc-800 duration-[50] hover:bg-rose-500 hover:shadow-lg hover:text-zinc-100 hover:border-rose-500 dark:hover:border-rose-500 rounded flex p-4 gap-2 items-center"
  on:click={() => {
    dispatch('message', category);
  }}
>
  {#if icon}
    <svelte:component this={icon} />
  {/if}
  <p class="text-left font-medium">
    {category.name}
  </p>
</button>
