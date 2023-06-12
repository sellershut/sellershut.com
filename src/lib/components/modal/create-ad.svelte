<script lang="ts">
  import type { CategoriesResult, Category } from '$lib/@types/category';
  import { findCategories } from '$lib/api/category/query';
  import { createQuery } from '@tanstack/svelte-query';
  import { byTextAscending } from '$lib/util/sort/sorter';
  import { categoryIcons } from '$lib/@types/category-icons';
  import CreateAdCategoryElement from './create-ad/create-ad-category-element.svelte';
  import IconBackCircle from '../icons/icon-back-circle.svelte';

  let parentId = 0;
  $: categories = createQuery<CategoriesResult, Error>({
    queryKey: ['categories', parentId],
    queryFn: async () => findCategories(1000, parentId, 1, false, true),
  });
  let selectedCategories: Category[];
  $: selectedCategories = [];
</script>

<div
  class="flex-1 px-3 overflow-y-auto overscroll-contain grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
>
  {#if $categories.isLoading}
    <div>Loading</div>
  {:else if $categories.isError}
    <div>{$categories.error.message}</div>
  {:else if $categories.isSuccess}
    {#each $categories.data.categories.sort(byTextAscending((category) => category.name)) as category}
      <CreateAdCategoryElement
        icon={categoryIcons($categories.data.categories).get(category.name)}
        on:message={(event) => {
          const currentCategory = event.detail;
          selectedCategories.push(currentCategory);
          parentId = currentCategory.id;
        }}
        {category}
      />
    {/each}
  {/if}
</div>
{#if selectedCategories.length}
  <div class="flex justify-between px-4 py-2">
    <button
      class="inline-flex items-center hover:text-rose-500 duration-200"
      on:click={() => {
        const lastItem = selectedCategories.pop();
        parentId = lastItem ? lastItem.parentId : 0;
      }}
    >
      <IconBackCircle />
      Back</button
    >
    <button
      class="inline-flex items-center hover:text-rose-500 duration-200"
      on:click={() => {
        // fill in ad info
      }}
      >Looks Good
      <IconBackCircle class="rotate-180" />
    </button>
  </div>
{/if}
