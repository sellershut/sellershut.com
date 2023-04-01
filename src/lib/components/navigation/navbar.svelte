<script lang="ts">
  import { fade, fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { createQuery } from '@tanstack/svelte-query';
  import type { ICategory } from '$lib/types/category';
  import getSubCategories, { keyRootCategories } from '$lib/api/category/query/subCategories';
  import IconSearch from '../icons/icon-search.svelte';
  import IconX from '../icons/icon-x.svelte';
  import ThemeSwitcher from '../theme-switcher.svelte';
  import IconHome from '../icons/icon-home.svelte';

  const categories = createQuery<ICategory[], Error>({
    queryKey: [keyRootCategories],
    queryFn: () => getSubCategories(),
  });

  const quickLinks = [
    {
      name: 'iPhone',
      path: '#',
    },
    {
      name: 'MacBook',
      path: '#',
    },
    {
      name: 'Mechanical Keyboard',
      path: '#',
    },
    {
      name: 'Cricket Bat',
      path: '#',
    },
    {
      name: 'Rugby Ball',
      path: '#',
    },
  ];

  let searchFocused = false;
  let showSearchContainer = false;
  let openMobileNav = false;
  const scales = 300;
  // slice the array -> we might want to get the top n categories
  const slice = (arr: ICategory[]) => arr.slice(0, 5);
</script>

<nav
  class={`bg-black/80 backdrop-blur flex ${
    openMobileNav ? 'h-screen' : 'h-10'
  } text-white z-50 text-sm fixed top-0 left-0 right-0`}
>
  {#if !searchFocused}
    <ul
      transition:fly={{ y: -100, duration: 500 }}
      class="z-20 flex w-full lg:w-[1000px] justify-between md:justify-around md:mx-auto px-2 fixed
      top-0 left-0 right-0 h-10 items-center"
    >
      <li class="w-1/3 md:hidden">
        <a
          href={'#'}
          on:click={() => {
            openMobileNav = !openMobileNav;
          }}
          class={`menu-icon-container h-10 ${
            openMobileNav ? 'w-5' : 'w-5 aspect-square'
          } flex items-center cursor-pointer `}
        >
          <div class="menu-icon relative w-full">
            <span
              class={`line-1 transition-all duration-300 ease absolute h-[2px] rounded w-full
              aspect-square bg-zinc-100 ${openMobileNav ? 'top-0 rotate-45' : 'px-4 -top-1'}`}
            />
            <span
              class={`line-2 transition-all duration-300 ease absolute h-[2px] rounded w-full
              aspect-square bg-zinc-100 ${openMobileNav ? 'top-0 -rotate-45' : 'top-1'} `}
            />
          </div>
        </a>
      </li>
      {#if !showSearchContainer}
        <li
          in:scale={{ duration: 0.5 * scales, easing: quintOut }}
          class="w-1/3 md:w-auto text-center md:text-left"
        >
          <IconHome class="mx-auto" />
        </li>
        {#if $categories.isLoading}
          <span>Loading</span>
        {:else if $categories.isSuccess}
          <li
            in:scale={{ duration: scales, easing: quintOut }}
            class="hidden md:flex h-full items-center justify-center"
          >
            <a class="mx-4 py-3 opacity-80 hover:opacity-100 inline" href={'#'}>All</a>
          </li>
          {#each slice($categories.data) as category, i}
            <li
              in:scale={{ duration: ((3 + i) / 2) * scales, easing: quintOut }}
              class="hidden md:flex h-full items-center justify-center"
            >
              <a class="mx-4 py-3 opacity-80 hover:opacity-100 inline" href={'#'}>{category.name}</a
              >
            </li>
          {/each}
        {/if}
        <li in:scale={{ duration: (8 / 2) * scales, easing: quintOut }} class="hidden md:block">
          <a
            href={'#'}
            on:click={() => {
              showSearchContainer = true;
            }}
          >
            <IconSearch />
          </a>
        </li>
        <li in:scale={{ duration: (9 / 2) * scales, easing: quintOut }} class="hidden md:block">
          Login
        </li>
        <li
          in:scale={{ duration: (10 / 2) * scales, easing: quintOut }}
          class="w-1/3 md:w-auto text-right md:text-left"
        >
          <ThemeSwitcher />
        </li>
      {:else}
        <div class="hidden: md:flex items-center justify-center w-full relative">
          {#if showSearchContainer}
            <div in:fly={{ x: 200, delay: 500 }}>
              <IconSearch class="text-gray-400" />
            </div>
            <form class="flex-1 flex flex-col">
              <input
                in:fly={{ x: 200, delay: 500 }}
                type="text"
                placeholder="search sellershut.com"
                class="w-full bg-transparent border-transparent focus:ring-transparent
                focus:border-transparent"
              />
              <div
                class="text-zinc-800 dark:text-zinc-100 absolute top-10 left-0 w-full px-0 py-8
                rounded-b-2xl flex flex-col space-y-1 bg-white dark:bg-zinc-800 shadow-md"
              >
                <h2 class="px-12 small-caps title-font font-bold">Quick Links</h2>
                {#each quickLinks as { path, name }, i}
                  <a
                    in:fly={{ x: 200, delay: i * 100 }}
                    class="opacity-80 hover:opacity-100 hover:bg-rose-400 px-12 py-2 inline-block
                    w-full"
                    href={path}
                  >
                    <span>{name}</span>
                  </a>
                {/each}
              </div>
            </form>
          {/if}
          <a
            href={'#'}
            on:click={() => {
              showSearchContainer = false;
            }}
          >
            <IconX class="text-gray-400 hover:text-gray-200" />
          </a>
        </div>
      {/if}
    </ul>
  {/if}

  {#if openMobileNav}
    <div
      class={`md:hidden absolute top-0 left-0 right-0 transition-all duration-500 w-full ${
        searchFocused ? 'translate-y-0' : 'translate-y-[40px]'
      } h-screen flex flex-col`}
    >
      <form
        action=""
        in:fly={{ y: -200 }}
        class="relative flex space-x-2 px-2 w-full overscroll-x-none justify-center items-center"
      >
        <input
          type="text"
          on:focus={() => {
            searchFocused = true;
          }}
          class="h-10 flex-1 rounded bg-zinc-800 pl-8 w-full"
          placeholder="search sellershut.com"
        />
        <div class="absolute top-2 left-1 text-gray-500">
          <IconSearch />
        </div>
        {#if searchFocused}
          <a
            on:click={() => {
              searchFocused = false;
            }}
            href={'#'}
            class="bg-rose-500 hover:bg-blue-400 px-4 py-2 rounded">Cancel</a
          >
        {/if}
      </form>

      {#if !searchFocused}
        {#if $categories.isLoading}
          <span>Loading...</span>
        {:else if $categories.isSuccess}
          {#each slice($categories.data) as category, i}
            <a
              in:fly={{ x: -20, y: 20, delay: 300 + (i + 1) * 100 }}
              class="mx-4 py-3 border-b border-gray-600 opacity-80 hover:opacity-100"
              href={'#'}>{category.name}</a
            >
          {/each}
        {/if}
      {:else}
        <h2 transition:fade class="pt-4 px-10 font-bold small-caps">Quick Links</h2>
        {#each quickLinks as { path, name }, i}
          <a
            in:fly={{ x: 20, y: -20, delay: (i + 1) * 100 }}
            class="mx-4 py-3 border-b border-gray-600 opacity-80 hover:opacity-100"
            href={path}>{name}</a
          >
        {/each}
      {/if}
    </div>
  {/if}

  {#if showSearchContainer}
    <a
      href={'#'}
      on:click={() => {
        showSearchContainer = false;
      }}
      transition:fade
      class="h-screen w-screen z-10 bg-black bg-opacity-50"
    >
      <div />
    </a>
  {/if}
</nav>
