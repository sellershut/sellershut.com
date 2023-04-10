<script lang="ts">
  import type { CategoriesResult } from '$lib/@types/category';
  import {
    keyFeaturedCategories,
    findCategories,
  } from '$lib/api/category/query';
  import { createQuery } from '@tanstack/svelte-query';
  import Glide from '@glidejs/glide';
  import { Breakpoints } from '@glidejs/glide/dist/glide.modular.esm';
  import { onMount } from 'svelte';

  onMount(() => {
    const glide = new Glide('.glide', {
      type: 'carousel',
      perView: 7,
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

    glide.mount({ Breakpoints });
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
</script>

<div>
  {#if $categories.isLoading}
    <span>Loading</span>
  {:else if $categories.isError}
    <span>{$categories.error.message}</span>
  {:else if $categories.isSuccess}
    <div class="glide">
      <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides">
          {#each $categories.data.categories as category}
            <li class="glide__slide flex flex-col gap-4 py-4">
              <img
                loading="lazy"
                class="h-64 md:h-60 lg:h-56 aspect-square rounded-full mx-auto"
                src={category.imageUrl}
                alt=""
              />
              <p class="text-center small-caps font-medium">{category.name}</p>
            </li>
          {/each}
        </ul>
      </div>
      <div class="glide__bullets bottom-0" data-glide-el="controls[nav]">
        {#each $categories.data.categories as _category, i}
          <button class={`glide__bullet`} data-glide-dir={`=${i}`} />
        {/each}
      </div>
    </div>
  {/if}
</div>
