<script lang="ts">
  import type { CategoriesResult } from '$lib/@types/category';
  import {
    keyFeaturedCategories,
    findCategories,
  } from '$lib/api/category/query';
  import { createQuery } from '@tanstack/svelte-query';

  const categories = createQuery<CategoriesResult, Error>({
    queryKey: [keyFeaturedCategories],
    queryFn: () =>
      findCategories(
        keyFeaturedCategories.max,
        keyFeaturedCategories.parentId,
        keyFeaturedCategories.page,
        keyFeaturedCategories.returnImages,
      ),
  });
</script>

<div class="w-full bg-zinc-500 p-4 rounded-md flex flex-col">
  <a href={'#'}>View All</a>
  {#if $categories.isLoading}
    <span>Loading</span>
  {:else if $categories.isError}
    <span>{$categories.error.message}</span>
  {:else if $categories.isSuccess}
    <div class="flex flex-col gap-12 items-center justify-center">
      {#each $categories.data.categories as category}
        <div class="mx-auto flex flex-col gap-4">
          <img
            class="h-64 rounded-full aspect-square bg-green-500"
            alt={`${category.name} image`}
            src={category.imageUrl}
          />
          <p class="small-caps text-center font-medium">{category.name}</p>
        </div>
      {/each}
    </div>
  {/if}
</div>
