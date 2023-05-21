<script lang="ts">
  import type { CategoriesResult, Category } from '$lib/@types/category';
  import { categoryIcons } from '$lib/@types/category-icons';
  import { findCategories } from '$lib/api/category/query';
  import CategoryModalEntry from '$lib/components/categories/category-modal-entry.svelte';
  import { createQuery } from '@tanstack/svelte-query';
  import { slide } from 'svelte/transition';
  import { selectedCategories } from '$lib/util/stores/create-ad';

  $: selectedCategoryId = 0;

  const sort = (arr: Category[]): Category[] =>
    arr.sort((a, b) => a.name.localeCompare(b.name));

  const updateSelection = (category: Category) => {
    selectedCategories.update((selected) => {
      // svelte reactivity triggered by assignments not state update
      // https://svelte.dev/tutorial/updating-arrays-and-objects
      selected.append(category);
      return selected;
    });
    selectedCategoryId = category.id;
  };

  $: query = createQuery<CategoriesResult, Error>({
    queryKey: ['subCategories', selectedCategoryId],
    queryFn: () => findCategories(1000, selectedCategoryId, 1, false),
  });
</script>

<h2 class="font text-zinc-500 dark:text-zinc-400">Pick a category</h2>
<div class="flex flex-col space-y-2">
  <div class="flex flex-wrap space-x-2">
    {#each $selectedCategories.iterReversed() as category}
      <div
        transition:slide
        class="border-zinc-700 border px-4 py-2 rounded text-xs"
      >
        {category.name}
      </div>
    {/each}
  </div>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto"
  >
    {#if $query.isLoading}
      <div>Loading</div>
    {:else if $query.isError}
      <div>{$query.error.message}</div>
    {:else if $query.isSuccess}
      {#each sort($query.data.categories) as category}
        <button
          on:click={() => {
            updateSelection(category);
          }}
          class="col-span-1 mr-1"
        >
          <CategoryModalEntry
            icons={categoryIcons($query.data.categories)}
            {category}
          />
        </button>
      {/each}
    {/if}
  </div>
</div>
