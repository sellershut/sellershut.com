<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import { findCategories, keyRootCategories } from '$lib/api/category/query';
  import type { CategoriesResult } from '$lib/@types/category';
  import { fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import IconHome from '../icons/icon-home.svelte';
  import IconSearch from '../icons/icon-search.svelte';

  const categories = createQuery<CategoriesResult, Error>({
    queryKey: [keyRootCategories, 7],
    queryFn: () => findCategories(7, 0, 1),
  });
  let openMobileNav = false;
  const searchFocused = false;
  let showSearchContainer = false;
  const toggleMobileNav = () => {
    openMobileNav = !openMobileNav;
  };
  const openSearchContainer = () => {
    showSearchContainer = true;
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
          <div class="h-1 relative w-full">
            <span
              class={`navbar-burger-line ${
                openMobileNav ? 'top-0 rotate-45' : 'px-4 -top-1'
              }`}
            />
            <span
              class={`navbar-burger-line ${
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
            class="navbar-link"
          >
            <a class="navbar-link-a" href={'/'}>All</a>
          </li>
          {#each $categories.data.categories as category, i}
            <li
              in:scale={{
                duration: ((3 + i) / 2) * scaleFactor,
                easing: quintOut,
              }}
              class="navbar-link"
            >
              <a class="navbar-link-a" href={'#'}>{category.name}</a>
            </li>
          {/each}
        {/if}
        <li
          in:scale={{ duration: (8 / 2) * scaleFactor, easing: quintOut }}
          class="hidden md:block"
        >
          <a href={'#'} on:click={openSearchContainer}><IconSearch /></a>
        </li>
      {/if}
    </ul>
  {/if}
</nav>
