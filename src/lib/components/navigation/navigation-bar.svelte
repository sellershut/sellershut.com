<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import { findCategories, keyRootCategories } from '$lib/api/category/query';
  import type { CategoriesResult } from '$lib/@types/category';
  import { fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import IconHome from '../icons/icon-home.svelte';

  const categories = createQuery<CategoriesResult, Error>({
    queryKey: [keyRootCategories, 7],
    queryFn: () => findCategories(7, 0, 1),
  });
  let openMobileNav = false;
  const searchFocused = false;
  const showSearchContainer = false;
  const toggleMobileNav = () => {
    openMobileNav = !openMobileNav;
  };
  const scaleFactor = 300;
</script>

<!-- 
{#if $categories.isLoading}
  <span>Loading</span>
{:else if $categories.isError}
  <span>Error: {$categories.error.message}</span>
{:else}
  <ul>
    {#each $categories.data.categories as category}
      <div>{category.name}</div>
    {/each}
  </ul>
{/if}
-->

<nav
  class={`bg-black/80 backdrop-blur flex ${
    openMobileNav ? 'h-screen' : 'h-10'
  } text-zinc-100 z-50 text-sm fixed top-0 left-0 right-0`}
>
  {#if !searchFocused}
    <ul
      transition:fly={{ y: -100, duration: 500 }}
      class="z-20 flex w-full lg:w-[1000px] justify-between md:justify-around
md:mx-auto px-2 fixed top-0 left-0 right-0 h-10 items-center"
    >
      <li>
        <a
          href={'#'}
          on:click={toggleMobileNav}
          class={`h-10 w-5 ${
            openMobileNav ? '' : 'aspect-square'
          } flex items-center cursor-pointer`}
        >
          <div class="menu-icon relative w-full">
            <span
              class={`transition-all duration-300 ease absolute h-[2px] rounded w-full
              aspect-square bg-zinc-100 ${
                openMobileNav ? 'top-0 rotate-45' : 'px-4 -top-1'
              }`}
            />
            <span
              class={`transition-all duration-300 ease absolute h-[2px] rounded w-full
              aspect-square bg-zinc-100 ${
                openMobileNav ? 'top-0 -rotate-45' : 'top-1'
              } `}
            />
          </div>
        </a>
      </li>
      {#if !showSearchContainer}
        <li
          in:scale={{ duration: 0.5 * scaleFactor, easing: quintOut }}
          class="w-1/3 md:w-auto text-center md:text-left"
        >
          <a href="/"><IconHome class="mx-auto" /></a>
        </li>
        {#if $categories.isLoading}
          <span>Loading</span>
        {:else if $categories.isError}
          <span>Error: {$categories.error.message}</span>
        {:else}
          <li
            in:scale={{ duration: scaleFactor, easing: quintOut }}
            class="hidden md:flex h-full items-center justify-center"
          >
            <a class="mx-4 py-3 opacity-80 hover:opacity-100 inline" href={'/'}
              >All</a
            >
          </li>
          {#each $categories.data.categories as category, i}
            <li
              in:scale={{
                duration: ((3 + i) / 2) * scaleFactor,
                easing: quintOut,
              }}
              class="hidden md:flex h-full items-center justify-center"
            >
              <a
                class="mx-4 py-3 opacity-100 hover:opacity-100 inline"
                href={'#'}>{category.name}</a
              >
            </li>
          {/each}
        {/if}
      {/if}
    </ul>
  {/if}
</nav>
