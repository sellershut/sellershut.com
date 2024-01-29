<script lang="ts">
  import IconLogo from '$components/icons/logo.svelte';
  import { Button } from '$components/ui/button';
  import { MagnifyingGlass, MixerHorizontal } from 'radix-icons-svelte';
  import * as Avatar from '$components/ui/avatar';
  import Glider from '$components/ui/glider.svelte';
  import CategorySlideItem from '$components/ui/category-slide-item.svelte';
  import sliderCategories from '$lib/content/slider-categories';
  import { page } from '$app/stores';
  import ThemeSwitcher from '$components/ui/theme-switcher.svelte';

  const { darkMode } = $props<{ darkMode: boolean }>();

  const isRootPage = $derived($page.route.id === '/');
</script>

<header
  class="sticky top-0 z-10 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 overflow-x-hidden"
>
  <div class="container flex items-center gap-2 border-b dark:border-muted pb-2">
    <a href="/" class="inline-flex gap-1">
      <IconLogo class="text-primary" />
      <span class="font-bold tracking-normal">sellershut</span>
    </a>
    <div class="flex-1" />
    <Button variant="outline">
      <MagnifyingGlass />
    </Button>
    <ThemeSwitcher {darkMode} />
    <Avatar.Root>
      <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
      <Avatar.Fallback>CN</Avatar.Fallback>
    </Avatar.Root>
  </div>
  {#if isRootPage}
    <div
      class="flex items-center w-screen justify-center md:justify-around md:flex-row-reverse flex-col gap-2 md:gap-4 pt-2 px-4 md:px-8 lg:px-12 2xl:px-16"
    >
      <Button variant="outline" class="inline-flex gap-2">
        <MixerHorizontal />
        Filter</Button
      >
      <Glider component={CategorySlideItem} data={sliderCategories} />
    </div>
  {/if}
</header>
