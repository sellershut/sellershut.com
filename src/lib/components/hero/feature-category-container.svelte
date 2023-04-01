<script lang="ts">
  import getSubCategories, { keyRootCategories } from '$lib/api/category/query/subCategories';
  import { createQuery } from '@tanstack/svelte-query';
  import type { ICategory } from '$lib/types/category';
  import shuffleArray from '$lib/shared/shuffle-array';
  import FeatureCategory from './feature-category.svelte';

  const categories = createQuery<ICategory[], Error>({
    queryKey: [keyRootCategories],
    queryFn: () => getSubCategories(),
  });

  const slice = (arr: ICategory[]) => shuffleArray(arr).slice(0, 7);
</script>

<h1 class="title-font font-bold text-4xl sm:text-5xl">Popular...</h1>
<div
  class="relative flex border border-white/5 shadow-md flex-col space-y-2 bg-gradient-to-br
    bg-opacity-40 from-white/60 to-white/20 p-4 backdrop-blur-md rounded-lg
    dark:bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] dark:from-zinc-800
    dark:via-slate-700 dark:to-zinc-600"
>
  <a href={'#'} class="font-medium text-rose-500 hover:text-rose-600 duration-200">View All</a>
  <div
    class="absolute top-0 left-0 noise h-full w-full mix-blend-overlay opacity-5
      dark:opacity-10 -z-10"
  />
  <div class="w-full flex flex-col flex-wrap sm:flex-row justify-around space-y-2 items-center">
    {#if $categories.isLoading}
      <span>Loading</span>
    {:else if $categories.isSuccess}
      {#each slice($categories.data) as category}
        <FeatureCategory {category} />
      {/each}
    {/if}
  </div>
</div>
