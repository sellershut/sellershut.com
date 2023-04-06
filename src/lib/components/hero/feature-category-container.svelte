<script lang="ts">
  import { getSubCategories, keyRootCategories } from '$lib/api/category/query';
  import { createQuery } from '@tanstack/svelte-query';
  import type { ICategory } from '$lib/types/category';
  import shuffleArray from '$lib/shared/shuffle-array';
  import { register } from 'swiper/element/bundle';
  import FeatureCategory from './feature-category.svelte';
  // import function to register Swiper custom elements
  // register Swiper custom elements
  register();

  const categories = createQuery<ICategory[], Error>({
    queryKey: [keyRootCategories],
    queryFn: () => getSubCategories(),
  });

  const limit = 7;

  const findCount = (width: number): number => {
    if (width >= 1536) {
      return 7;
    }
    if (width >= 1280) {
      return 6;
    }
    if (width >= 1024) {
      return 5;
    }
    if (width >= 768) {
      return 4;
    }
    if (width >= 640) {
      return 3;
    }
    if (width >= 480) {
      return 2;
    }
    return 1;
  };

  const slice = (arr: ICategory[]) => shuffleArray(arr).slice(0, limit);
  $: innerWidth = 0;
  $: count = findCount(innerWidth);
</script>

<svelte:window bind:innerWidth />

<h1 class="title-font font-semibold text-4xl sm:text-5xl">Popular...</h1>
<div
  class="relative flex border border-rose-500/10 shadow-md flex-col space-y-2 bg-gradient-to-br
    dark:border-white/5 bg-opacity-40 from-white/60 to-white/20 p-4 backdrop-blur-md rounded-lg
    dark:bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] dark:from-zinc-800
    dark:via-slate-700 dark:to-zinc-600"
>
  <div>
    <a
      href={'/browse/categories'}
      class="font-medium duration-200 bg-gradient-to-br dark:from-white/20 dark:to-white/10 backdrop-blur
      rounded hover:bg-zinc-800/10 hover:text-zinc-800 border border-rose-500/10 dark:border-zinc-800 text-zinc-800
      dark:text-zinc-300/70 dark:hover:text-zinc-300 py-2 px-6 shadow small-caps">View All</a
    >
  </div>
  <div
    class="absolute top-0 left-0 noise h-full w-full mix-blend-overlay opacity-5
      dark:opacity-10 -z-10"
  />

  <swiper-container
    slides-per-view={count}
    pagination="true"
    navigation="true"
    css-mode="true"
    class="w-full py-8 flex items-center justify-around"
  >
    {#if $categories.isLoading}
      {#each Array(limit) as _loadingCategory}
        <swiper-slide lazy="true">
          <FeatureCategory />
        </swiper-slide>
      {/each}
    {:else if $categories.isSuccess}
      {#each slice($categories.data) as category}
        <swiper-slide lazy="true">
          <FeatureCategory {category} />
        </swiper-slide>
      {/each}
    {/if}
  </swiper-container>
</div>
