<script lang="ts">
  import type { CategoriesResult, Category } from '$lib/@types/category';
  import { categoryIcons } from '$lib/@types/category-icons';
  import type { CreateQueryResult } from '@tanstack/svelte-query';
  import CategoriesListEntry from './categories-list-entry.svelte';
  import IconChevronRight from '../icons/icon-chevron-right.svelte';
  import IconChevronLeft from '../icons/icon-chevron-left.svelte';

  export let categories: CreateQueryResult<CategoriesResult, Error>;
  const sort = (arr: Category[]): Category[] =>
    arr.sort((a, b) => a.name.localeCompare(b.name));

  const sideScroll = (
    direction: 'left' | 'right',
    speed = 25,
    distance = 100,
    step = 10,
  ) => {
    const element = document.getElementById('cat-container');
    if (element) {
      let scrollAmount = 0;
      const slideTimer = setInterval(() => {
        if (direction === 'left') {
          element.scrollLeft -= step;
        } else {
          element.scrollLeft += step;
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
          window.clearInterval(slideTimer);
        }
      }, speed);
    }
  };
</script>

<div class="px-4">
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
        {#each sort($categories.data.categories) as category}
          <CategoriesListEntry
            icons={categoryIcons($categories.data.categories)}
            {category}
          />
        {/each}
      </div>
      <button
        class="absolute left-0 top-0 bottom-0 xl:hidden"
        on:click={() => {
          sideScroll('left');
        }}
        ><IconChevronLeft
          class="bg-zinc-200 dark:bg-zinc-600 border border-zinc-400 rounded-full scale-110 shadow"
        /></button
      >
      <button
        class="absolute right-0 top-0 bottom-0 xl:hidden"
        on:click={() => {
          sideScroll('right');
        }}
        ><IconChevronRight
          class="bg-zinc-200 dark:bg-zinc-600 border border-zinc-400 rounded-full scale-110 shadow"
        /></button
      >
    </div>
  {/if}
</div>
