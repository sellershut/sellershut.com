<script lang="ts">
  import type { CategoriesResult } from '$lib/@types/category';
  import { findCategories } from '$lib/api/category/query';
  import { createQuery } from '@tanstack/svelte-query';
  import { byTextAscending } from '$lib/util/sort/sorter';
  import CreateAdCategoryElement from './create-ad/create-ad-category-element.svelte';

  let parentId = 0;
  $: categories = createQuery<CategoriesResult, Error>({
    queryKey: ['categories', parentId],
    queryFn: async () => findCategories(1000, parentId, 1, false),
  });
</script>

<div class="flex flex-col gap-4">
  <div>
    <h3 class="text-xl font-medium title-font">Select Category</h3>
    <p class="text-sm">What kind of item do you want to sell?</p>
  </div>
  <div>
    {#if $categories.isLoading}
      <div>Loading</div>
    {:else if $categories.isError}
      <div>{$categories.error.message}</div>
    {:else if $categories.isSuccess}
      <div class="grid grid-cols-2 md:grid-cols-3 gap-1">
        {#each $categories.data.categories.sort(byTextAscending((category) => category.name)) as category}
          <CreateAdCategoryElement
            on:message={(event) => {
              parentId = event.detail;
            }}
            {category}
          />
        {/each}
      </div>
    {/if}
  </div>
</div>
