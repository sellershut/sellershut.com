<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import type { Category } from '$lib/@types/category';

  export let icons: Map<string, typeof SvelteComponent | undefined>;
  export let category: Category;

  export const updateQuery = () => {
    if ($page.url.searchParams.get('category') === category.name) {
      $page.url.searchParams.delete('category');
    } else {
      $page.url.searchParams.set('category', category.name);
    }

    goto(`${$page.url.toString()}`);
  };
</script>

<a
  on:click={updateQuery}
  href={'#'}
  class={`flex flex-col items-center gap-2 p-3 ${
    $page.url.searchParams.get('category') === category.name
      ? 'border-b-2 text-zinc-700 dark:text-zinc-200'
      : 'text-zinc-500 dark:text-zinc-600 '
  } hover:text-zinc-800 dark:hover:text-zinc-200 transition cursor-pointer hover:border-b-2 border-rose-500`}
>
  {#if icons.get(category.name)}
    <svelte:component this={icons.get(category.name)} class="scale-90" />
  {/if}
  <p class="font-semibold text-center text-xs whitespace-nowrap">
    {category.name}
  </p>
</a>
