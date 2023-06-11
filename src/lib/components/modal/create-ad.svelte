<script lang="ts">
  import type { CategoriesResult } from '$lib/@types/category';
  import { findCategories } from '$lib/api/category/query';
  import { createQuery } from '@tanstack/svelte-query';

  let parentId = 0;
  $: categories = createQuery<CategoriesResult, Error>({
    queryKey: ['categories', parentId],
    queryFn: async () => findCategories(1000, parentId, 1, false),
  });
</script>

<div>
  <h3 class="text-3xl font-medium title-font">Select Category</h3>
  <p>What kind of item do you want to sell?</p>
  <div>
    {#if $categories.isLoading}
      <div>Loading</div>
    {:else if $categories.isError}
      <div>{$categories.error.message}</div>
    {:else if $categories.isSuccess}
      <div class="relative">
        <div
          id="cat-container"
          class="flex container overflow-x-auto justify-between relative scrollbar-hide"
        >
          {#each $categories.data.categories as category}
            <button
              on:click={() => {
                parentId = category.id;
              }}
            >
              {category.name}</button
            >
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>
