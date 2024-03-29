<script lang="ts">
  import IconLogo from '$components/icons/logo.svelte';
  import { Button } from '$components/ui/button';
  import { Bell, ChatBubble, MagnifyingGlass } from 'radix-icons-svelte';
  import Glider from '$components/ui/glider.svelte';
  import CategorySlideItem from '$components/ui/category-slide-item.svelte';
  import { page } from '$app/stores';
  import ThemeSwitcher from '$components/ui/theme-switcher.svelte';
  import type { SliderCategory } from '$lib/api/categories';
  import { createQuery } from '@tanstack/svelte-query';
  import { api } from '$lib/api/categories/api';
  import NavSearch from '$components/ui/nav-search.svelte';
  import NewListing from '$components/new-listing/new-listing.svelte';
  import { getContext } from 'svelte';
  import type { Session, User } from 'lucia';
  import FilterDialog from './filter-dialog.svelte';
  import AvatarButton from './avatar-button.svelte';

  // NOTE: https://github.com/sveltejs/eslint-plugin-svelte/issues/652
  // eslint-disable-next-line svelte/valid-compile
  const isRootPage = $derived($page.route.id === '/' || $page.route.id === '/(app)');

  const categories = createQuery<SliderCategory[], Error>({
    queryKey: ['slider-categories'],
    queryFn: () => api().getParentCategories({ first: 100 }),
  });
  const cats = $derived($categories.data ?? []);

  let searchOpen = $state(false);
  const showScrollbar = $derived(!searchOpen);
  const showSlider = $derived(isRootPage && !searchOpen);

  $effect(() => {
    document.body.style.overflowY = showScrollbar ? '' : 'hidden';
  });

  const toggleSearch = () => {
    searchOpen = !searchOpen;
  };

  const session: Session | null = getContext('sessionData');
  const user: User | null = getContext('sessionUser');
</script>

<div class="sticky top-0 z-10 w-full">
  <div class="relative">
    <header
      class={`${searchOpen ? 'hidden md:block' : ''} transition-transform transform ease-in-out duration-300  border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-background/90 p-2 overflow-x-hidden`}
    >
      <div
        class={`container flex items-center gap-2 transition ${searchOpen ? 'border-opacity-0' : 'border-opacity-100'} dark:border-muted border-b  pb-2`}
      >
        <a href="/" class="inline-flex gap-1">
          <IconLogo class="text-primary" />
          <span class="font-bold tracking-normal hidden sm:block">sellershut</span>
        </a>
        <div class="flex-1" />
        <Button variant="outline" on:click={toggleSearch}>
          <MagnifyingGlass />
        </Button>
        <ThemeSwitcher />
        <AvatarButton />
        <NewListing />
        {#if session && user}
          {#each [Bell, ChatBubble] as icon}
            <Button variant="outline" class="hidden sm:block">
              <div class="relative">
                <svelte:component this={icon} />
                <div class="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full" />
              </div>
            </Button>
          {/each}
        {/if}
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

    <NavSearch {searchOpen} on:close={toggleSearch} />
  </div>
</div>
