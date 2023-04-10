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
    <div class="flex flex-col gap-4 items-center justify-center">
      {#each $categories.data.categories as category}
        <div class="bg-red-500 mx-auto">
          <img
            class="h-48 rounded-full aspect-square bg-green-500"
            alt={`${category.name} image`}
            src={category.imageUrl}
          />
          <p class="small-caps text-center">{category.name}</p>
        </div>
      {/each}
    </div>
  {/if}
</div>
