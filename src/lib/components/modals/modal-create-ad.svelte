<script lang="ts">
  import type { CategoriesResult, Category } from '$lib/@types/category';
  import { findCategories, keyRootCategories } from '$lib/api/category/query';
  import { createQuery } from '@tanstack/svelte-query';
  import { categoryIcons } from '$lib/@types/category-icons';
  import IconX from '../icons/icon-x.svelte';
  import CategoryModalEntry from '../categories/category-modal-entry.svelte';

  const sort = (arr: Category[]): Category[] =>
    arr.sort((a, b) => a.name.localeCompare(b.name));

  const categories = createQuery<CategoriesResult, Error>({
    queryKey: [keyRootCategories],
    queryFn: () =>
      findCategories(
        keyRootCategories.max,
        keyRootCategories.parentId,
        keyRootCategories.page,
        keyRootCategories.returnImages,
      ),
  });
</script>

<div class="p-4 flex flex-col gap-2">
  <div class="relative pb-3 border-b-[1px]">
    <button on:click class="absolute left-0">
      <IconX class="hover:text-rose-500 transition duration-300 scale-75" />
    </button>
    <h1 class="font-semibold text-center small-caps">Create an Ad</h1>
  </div>
  <div class="flex flex-col gap-1">
    <h1 class="font-bold">Which best describes the item you want to sell?</h1>
    {#if $categories.isLoading}
      <div>Loading</div>
    {:else if $categories.isError}
      <div>{$categories.error.message}</div>
    {:else}
      <h2 class="font text-zinc-500 dark:text-zinc-400">Pick a category</h2>
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto"
      >
        {#each sort($categories.data.categories) as category}
          <div class="col-span-1">
            <CategoryModalEntry
              icons={categoryIcons($categories.data.categories)}
              {category}
            />
          </div>
        {/each}
      </div>
      <div class="md:mt-2 flex justify-end">
        <a
          href={'#'}
          class="flex-shrink-0 text-white bg-rose-500 border-0 py-2 px-8 focus:outline-none
        hover:bg-rose-600 rounded text-lg mt-10 sm:mt-0">Next</a
        >
      </div>
    {/if}
  </div>
</div>
