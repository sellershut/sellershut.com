<script lang="ts">
  import IconLogo from '$components/icons/logo.svelte';
  import { Button } from '$components/ui/button';
  import { MagnifyingGlass } from 'radix-icons-svelte';
  import * as Avatar from '$components/ui/avatar';
  import Glider from '$components/ui/glider.svelte';
  import CategorySlideItem from '$components/ui/category-slide-item.svelte';
  import { page } from '$app/stores';
  import ThemeSwitcher from '$components/ui/theme-switcher.svelte';
  import type { SliderCategory } from '$lib/api/categories';
  import { createQuery } from '@tanstack/svelte-query';
  import { api } from '$lib/api/categories/api';
  import NavSearch from '$components/ui/nav-search.svelte';
  import FilterDialog from './filter-dialog.svelte';

  const { darkMode } = $props<{ darkMode: boolean }>();

  // NOTE: https://github.com/sveltejs/eslint-plugin-svelte/issues/652
  // eslint-disable-next-line svelte/valid-compile
  const isRootPage = $derived($page.route.id === '/');

  const categories = createQuery<SliderCategory[], Error>({
    queryKey: ['slider-categories'],
    queryFn: () => api().getParentCategories({ first: 100 }),
  });
  const cats = $derived($categories.data);

  let searchOpen = $state(true);
  const showScrollbar = $derived(!searchOpen);
  const showSlider = $derived(isRootPage && !searchOpen);

  $effect(() => {
    document.body.style.overflowY = showScrollbar ? '' : 'hidden';
  });

  const toggleSearch = () => {
    searchOpen = !searchOpen;
  };
</script>

<div class="relative">
  <header
    class={`${searchOpen ? 'hidden md:block' : ''} transition-transform transform ease-in-out duration-300 sticky top-0 z-10 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-background/90 p-2 overflow-x-hidden`}
  >
    <div
      class={`container flex items-center gap-2 transition ${searchOpen ? 'border-opacity-0' : 'border-opacity-100'} dark:border-muted border-b  pb-2`}
    >
      <a href="/" class="inline-flex gap-1">
        <IconLogo class="text-primary" />
        <span class="font-bold tracking-normal">sellershut</span>
      </a>
      <div class="flex-1" />
      <Button variant="outline" on:click={toggleSearch}>
        <MagnifyingGlass />
      </Button>
      <ThemeSwitcher {darkMode} />
      <Avatar.Root>
        <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar.Root>
    </div>
    <div
      class={`${showSlider ? 'flex ' : 'hidden'} items-center w-screen justify-center md:justify-around md:flex-row-reverse flex-col gap-2 md:gap-4 pt-2 px-4 md:px-8 lg:px-12 2xl:px-16`}
    >
      <FilterDialog />
      {#if cats}
        <Glider component={CategorySlideItem} data={cats} />
      {/if}
    </div>
  </header>

  <NavSearch {searchOpen} />
</div>
