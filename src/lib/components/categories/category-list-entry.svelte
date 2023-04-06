<script lang="ts">
  import type { ICategory } from '$lib/types/category';
  import type { SvelteComponent } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  export let icons: Map<string, typeof SvelteComponent>;
  export let category: ICategory;

  export const updateQuery = () => {
    /*
    let currentQuery = new URLSearchParams();

    if (queryParams) {
      currentQuery = queryParams;
    }

    const updatedQuery = currentQuery;
    updatedQuery.set('category', category.name);

    // remove the category from URL if it was previously selected
    if (queryParams?.get('category') === category.name) {
      updatedQuery.delete('category');
    }
    */
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
      ? 'border-b-2 text-zinc-800 dark:text-zinc-200'
      : 'text-zinc-600 dark:text-zinc-400 '
  } hover:text-zinc-800 dark:hover:text-zinc-200 transition cursor-pointer hover:border-b-2 border-rose-500`}
>
  <svelte:component this={icons.get(category.name)} />
  <p class="font-medium text-center text-xs small-caps pb-3">
    {category.name}
  </p>
</a>
