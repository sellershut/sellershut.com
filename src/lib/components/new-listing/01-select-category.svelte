<script lang="ts">
  import { Input } from '$components/ui/input';
  import { Separator } from '$components/ui/separator';
  import { Button } from '$components/ui/button';
  import * as Dialog from '$components/ui/dialog';
  import { nonWhitespaceInput } from '$lib/utils';
  import type { Category } from '$lib/api/categories';
  import { Cross2 } from 'radix-icons-svelte';
  import { scale } from 'svelte/transition';
  import { api } from '$lib/api/categories/api';
  import type { Edge } from '$lib/api/response/graphql';
  import CategoriesBody from './categories-body.svelte';

  let searchQuery = $state('');
  const validInput = $derived(nonWhitespaceInput(searchQuery));
  const whitespaceOnly = $derived(searchQuery.length && !validInput);

  type IdExtract = Pick<Category, 'name' | 'id'>;
  let selectedCategories: IdExtract[] = $state([]);

  const pushCategory = (evt: CustomEvent<IdExtract>) => {
    selectedCategories.push(evt.detail);
  };

  let timeout: number;
  let searching = $state(false);

  let searchResults: Edge<Partial<{ category: Partial<Category>; parentName?: string }>>[] = $state(
    []
  );

  function reset() {
    searchResults = [];
    searching = false;
  }

  function getCategories() {
    if (!validInput) {
      reset();
      return;
    }

    api()
      .searchWithParentName({ first: 100 }, searchQuery)
      .then((res) => {
        console.log('searching');
        searchResults = res.data?.data?.searchWithParentName.edges ?? [];
        searching = false;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleSearch() {
    searching = true;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(getCategories, 500);
  }
</script>

<Dialog.Description>Which category best suits your item?</Dialog.Description>
<div
  class={`grid w-full items-center gap-1.5 text-foreground ${selectedCategories.length ? 'hidden' : ''}`}
>
  <Input
    type="text"
    on:input={handleSearch}
    placeholder="search for a category instead"
    bind:value={searchQuery}
    class="w-full"
  />
  <p class={`text-xs ${whitespaceOnly ? 'text-destructive' : 'hidden'}`}>
    It looks like your search query is invalid
  </p>
</div>
<Separator class="my-2 md:my-4" />
<div class="grid gap-1 max-h-56 overflow-y-auto">
  {#if selectedCategories.length}
    <div class="flex text-xs gap-2 flex-wrap">
      {#each selectedCategories as category}
        <div transition:scale>
          <Button
            class="relative text-foreground"
            variant="outline"
            size="sm"
            on:click={() => {
              const elementPos = selectedCategories.map((x) => x.id).indexOf(category.id);
              selectedCategories = selectedCategories.slice(0, elementPos);
            }}
          >
            {category.name}
            <div
              class="absolute top-0 right-0 h-4 w-4 border rounded-full flex items-center justify-center"
            >
              <Cross2 class="scale-75" />
            </div>
          </Button>
        </div>
      {/each}
    </div>
    <Separator class="my-2 md:my-4" />
  {/if}
  <CategoriesBody
    bind:searching
    bind:searchQuery
    bind:searchResults
    {selectedCategories}
    on:sendCategory={pushCategory}
  />
</div>
