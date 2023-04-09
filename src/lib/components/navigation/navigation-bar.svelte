<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import { findCategories, keyRootCategories } from '$lib/api/category/query';
  import type { CategoriesResult } from '$lib/@types/category';
  import { fly } from 'svelte/transition';

  const categories = createQuery<CategoriesResult, Error>({
    queryKey: [keyRootCategories, 7],
    queryFn: () => findCategories(7, 0, 1),
  });
  let openMobileNav = false;
  const searchFocused = false;
  const toggleMobileNav = () => {
    openMobileNav = !openMobileNav;
  };
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
    </ul>
  {/if}
</nav>
