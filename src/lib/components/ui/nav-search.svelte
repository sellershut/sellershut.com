<script lang="ts">
  import { Button } from '$components/ui/button';
  import api from '$lib/api/categories/api';
  import type { Edge } from '$lib/api/response/graphql';
  import { Cross2, MagnifyingGlass } from 'radix-icons-svelte';
  import { createEventDispatcher } from 'svelte';
  import LoadingSpinner from './loading-spinner.svelte';
  import { nonWhitespaceInput } from '$lib/utils';
  import type { Category } from '$lib/types/category';

  const dispatch = createEventDispatcher();

  let { searchOpen } = $props<{ searchOpen: boolean }>();

  let searchInput = $state('');
  let searching = $state(false);
  let timeout: number;

  const close = () => {
    searchInput = '';
    dispatch('close', { text: 'mouse left search overlay' });
  };

  let validInput = $derived(nonWhitespaceInput(searchInput));

  let searchResults: Edge<Partial<{ category: Partial<Category>; parentName?: string }>>[] = $state(
    []
  );

  function handleSearch() {
    searching = true;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(getCategories, 500);
  }

  function getCategories() {
    if (!validInput) {
      reset();
      return;
    }

    api()
      .searchWithParentName({ first: 10 }, searchInput)
      .then((res) => {
        searchResults = res.data?.data?.searchWithParentName.edges ?? [];
        searching = false;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function reset() {
    searchResults = [];
    searching = false;
  }
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
              on:input={handleSearch}
              type="search"
              id="default-search"
              class="block w-full p-4 ps-10 font-semibold text-xl focus:outline-none bg-transparent focus:ring-0 focus:border-primary focus:border-none"
              placeholder="seach sellershut.com"
              required
            />
          </div>
        </form>
        <div class="px-8 pb-4">
          {#if validInput && searching}
            <LoadingSpinner />
          {:else if validInput && searchResults.length}
            <ul>
              {#each searchResults as { node: { category, parentName } }}
                {#if category && parentName}
                  <li class="text-sm py-2 md:text-base md:py-1 w-full">
                    <a href={'#'}>
                      <span class="font-medium"
                        >{category.name}
                        <span class="text-muted-foreground font-normal"
                          >{parentName ? `in ${parentName}` : ''}</span
                        >
                      </span>
                    </a>
                  </li>
                {/if}
              {/each}
            </ul>
          {:else if validInput && !searchResults.length}
            <div>No results available</div>
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
