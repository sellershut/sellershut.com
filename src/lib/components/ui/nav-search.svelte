<script lang="ts">
  import { Button } from '$components/ui/button';
  import type { Category } from '$lib/api/categories';
  import api from '$lib/api/categories/api';
  import type { Edge, GraphQLPaginatedResult } from '$lib/api/response/graphql';
  import { createQuery } from '@tanstack/svelte-query';
  import { Cross2, MagnifyingGlass } from 'radix-icons-svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let { searchOpen } = $props<{ searchOpen: boolean }>();
  const close = () => {
    dispatch('close', { text: 'mouse left search overlay' });
  };

  let searchInput = $state('');

  const validateInput = (query: string): boolean => {
    return query.trim().length != 0;
  };

  let validInput = $derived(validateInput(searchInput));

  let categories = $derived(
    validInput
      ? createQuery<GraphQLPaginatedResult<Partial<Category>>, Error>({
          queryKey: ['search', searchInput],
          queryFn: () => api().search({ first: 10 }, searchInput),
        })
      : null
  );

  let searchResults: Edge<Partial<Category>>[] = [];
  $effect(() => {
    searchResults = $categories?.data?.data?.data.search.edges ?? [];
  });
</script>

<div
  class={`${searchOpen ? '' : 'hidden'} -mt-3 absolute z-20 top-full min-h-screen w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-background/90`}
>
  <div
    role="menu"
    tabindex="0"
    class="bg-background shadow rounded-b-xl pt-3"
    on:mouseleave={close}
  >
    <div class="container flex flex-col">
      <Button variant="ghost" class="place-self-end md:hidden" on:click={close}>
        <Cross2 />
      </Button>
      <div class="px-2 md:px-8 lg:px-16 xl:px-32 py-4">
        <form class="relative">
          <label for="default-search" class="mb-2 text-sm font-medium sr-only">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <MagnifyingGlass class="scale-125" />
            </div>
            <input
              bind:value={searchInput}
              type="search"
              id="default-search"
              class="block w-full p-4 ps-10 font-semibold text-xl focus:outline-none bg-transparent focus:ring-0 focus:border-primary focus:border-none"
              placeholder="seach sellershut.com"
              required
            />
          </div>
        </form>
        <div class="px-8 pb-4">
          {#if validInput}
            <div>Hello</div>
          {:else}
            <h1 class="text-2xl font-bold pb-4">Popular Now</h1>
            <ul class="flex flex-col px-2 text-popover-foreground">
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
              <div>a</div>
            </ul>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
