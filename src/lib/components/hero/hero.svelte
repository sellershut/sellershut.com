<script lang="ts">
  import type { CategoriesResult } from '$lib/@types/category';
  import {
    keyFeaturedCategories,
    findCategories,
  } from '$lib/api/category/query';
  import { createQuery } from '@tanstack/svelte-query';
  import Glide from '@glidejs/glide';
  import { Breakpoints, Autoplay } from '@glidejs/glide/dist/glide.modular.esm';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  onMount(() => {
    const glide = new Glide('.glide', {
      type: 'carousel',
      perView: 7,
      autoplay: false,
      breakpoints: {
        1760: {
          perView: 7,
        },
        1536: {
          perView: 6,
        },
        1440: {
          perView: 5,
        },
        1280: {
          perView: 4,
        },
        1024: {
          perView: 3,
        },
        768: {
          perView: 2,
        },
        480: {
          perView: 1,
        },
      },
    });

    glide.mount({ Breakpoints, Autoplay });
  });
  const categories = createQuery<CategoriesResult, Error>({
    queryKey: [keyFeaturedCategories],
    queryFn: () =>
      findCategories(
        keyFeaturedCategories.max,
        keyFeaturedCategories.parentId,
        keyFeaturedCategories.page,
        keyFeaturedCategories.returnImages,
      ),
  });

  const navigate = (name: string) => {
    const url = new URL($page.url);
    url.pathname = 'browse/categories';
    url.searchParams.set('category', name);
    goto(`${url}`);
  };
</script>

<div
  class="relative flex border border-rose-500/10 shadow-md flex-col space-y-2 bg-gradient-to-br
    dark:border-white/5 bg-opacity-40 from-white/60 to-white/20 p-4 backdrop-blur-md rounded-lg
    dark:bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] dark:from-zinc-800
    dark:via-slate-700 dark:to-zinc-600"
>
  <div
    class="absolute top-0 left-0 noise h-full w-full mix-blend-overlay opacity-5
      dark:opacity-10 -z-10"
  />

  {#if $categories.isLoading}
    <span>Loading</span>
  {:else if $categories.isError}
    <span>{$categories.error.message}</span>
  {:else if $categories.isSuccess}
    <div>
      <a
        href={'/browse/categories'}
        class="font-medium duration-200 bg-gradient-to-br dark:from-white/20 dark:to-white/10 backdrop-blur
      rounded hover:bg-zinc-800/10 hover:text-zinc-800 border border-rose-500/10 dark:border-zinc-800 text-zinc-800
      dark:text-zinc-300/70 dark:hover:text-zinc-300 py-2 px-6 shadow small-caps"
        >View All</a
      >

      <div class="glide">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            {#each $categories.data.categories as category}
              <li class="glide__slide py-4">
                <a
                  href={'#'}
                  on:click={() => navigate(category.name)}
                  class="group flex flex-col gap-1"
                >
                  <img
                    loading="lazy"
                    class="h-64 sm:h-60 md:h-56 lg:h-52 aspect-square rounded-full mx-auto group-hover:border-4 group-hover:border-rose-500 duration-300 shadow drop-shadow-md"
                    src={category.imageUrl}
                    alt=""
                  />
                  <p class="text-center small-caps font-medium">
                    {category.name}
                  </p>
                  <span
                    class="invisible hidden w-2 aspect-square transition-all duration-100 bg-rose-500 rounded-full
    group-hover:visible md:block mx-auto"
                  />
                </a>
              </li>
            {/each}
          </ul>
        </div>
        <div class="glide__bullets bottom-0" data-glide-el="controls[nav]">
          {#each $categories.data.categories as _category, i}
            <button
              class={`glide__bullet bg-rose-300 dark:bg-zinc-950/50`}
              data-glide-dir={`=${i}`}
            />
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>
