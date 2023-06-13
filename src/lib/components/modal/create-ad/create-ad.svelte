<script lang="ts">
  import type { CategoriesResult, Category } from '$lib/@types/category';
  import { findCategories } from '$lib/api/category/query';
  import { createQuery } from '@tanstack/svelte-query';
  import { byTextAscending } from '$lib/util/sort/sorter';
  import { categoryIcons } from '$lib/@types/category-icons';
  import { scale, slide } from 'svelte/transition';
  import IconBackCircle from '$lib/components/icons/icon-back-circle.svelte';
  import IconXCircle from '$lib/components/icons/icon-x-circle.svelte';
  import { modal } from '$lib/util/stores/modal';
  import Button from '$lib/components/button.svelte';
  import CreateAdCategoryElement from './create-ad-category-element.svelte';
  import AdInfo from './ad-info.svelte';

  let parentId = 0;
  $: categories = createQuery<CategoriesResult, Error>({
    queryKey: ['categories', parentId],
    queryFn: async () => findCategories(1000, parentId, 1, false, true),
  });
  let selectedCategories: Category[];
  $: selectedCategories = [];

  const clearCategoriesFromIndex = (index: number) => {
    if (index === 0) {
      selectedCategories = [];
      parentId = 0;
    } else {
      selectedCategories.length = index;
      const lastItem = selectedCategories[selectedCategories.length - 1];
      if (lastItem) {
        parentId = lastItem.id;
      } else {
        parentId = 0;
      }
      selectedCategories = [...selectedCategories];
    }
  };

  const addSubCategory = (event: { detail: Category }) => {
    const currentCategory = event.detail;
    // have to reassign to trigger svelte reactivity
    selectedCategories = [...selectedCategories, currentCategory];
    parentId = currentCategory.id;
  };

  const removeLastAddedCategory = () => {
    const lastItem = selectedCategories.pop();
    parentId = lastItem ? lastItem.parentId : 0;
    selectedCategories = [...selectedCategories];
  };

  const showNextModal = () => {
    $modal = {
      isVisible: true,
      content: AdInfo,
      title: {
        value: 'Details',
        subTitle: 'Tell us all you can about what you want to sell',
      },
    };
  };
</script>

<div class="hidden lg:flex gap-2">
  {#each selectedCategories as category, i}
    <div
      transition:scale
      class="border border-zinc-300 dark:border-zinc-800 rounded px-4 py-2 relative"
    >
      <button
        class="absolute top-0 right-0 scale-75"
        on:click={() => clearCategoriesFromIndex(i)}
      >
        <IconXCircle class="hover:text-rose-500" />
      </button>
      <p class="text-xs whitespace-nowrap overflow-hidden w-20 text-ellipsis">
        {category.name}
      </p>
    </div>
  {/each}
</div>
<div
  class={`flex-1 px-3 overscroll-contain grid gap-1 grid-cols-1 ${
    $categories.isSuccess
      ? 'sm:grid-cols-2 md:grid-cols-3 overflow-y-auto'
      : 'overflow-hidden'
  }`}
>
  {#if $categories.isLoading}
    <div class="flex items-center justify-center space-x-4">
      {#each [1, 2, 3] as i}
        <div
          transition:slide={{ duration: i * 100 }}
          class="animate-spin h-5 aspect-square bg-rose-500"
        />
      {/each}
    </div>
  {:else if $categories.isError}
    <div>{$categories.error.message}</div>
  {:else if $categories.isSuccess}
    {#each $categories.data.categories.sort(byTextAscending((category) => category.name)) as category, pos}
      <CreateAdCategoryElement
        icon={categoryIcons($categories.data.categories).get(category.name)}
        on:message={addSubCategory}
        {pos}
        {category}
      />
    {/each}
  {/if}
</div>
{#if selectedCategories.length}
  <div in:slide class="flex justify-between px-4 py-2">
    <Button
      icon={IconBackCircle}
      text={'Back'}
      isPrimary={false}
      eventHandler={removeLastAddedCategory}
    />
    <Button
      icon={IconBackCircle}
      text={'Proceed'}
      styles="rotate-180"
      eventHandler={showNextModal}
    />
  </div>
{/if}
