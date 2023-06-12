<script lang="ts">
  import type { Category } from '$lib/@types/category';
  import { createEventDispatcher } from 'svelte';
  import type { SvelteComponent } from 'svelte';

  const dispatch = createEventDispatcher();

  export let category: Category;
  export let icon: typeof SvelteComponent | undefined;
</script>

<button
  class="border w-full border-zinc-300 dark:border-zinc-800 duration-200 hover:border-rose-500 dark:hover:border-rose-500 rounded flex p-4 gap-2 items-center"
  on:click={() => {
    dispatch('message', category);
  }}
>
  {#if icon}
    <svelte:component this={icon} />
  {/if}
  <p class="text-left">
    {category.name}
  </p>
</button>
