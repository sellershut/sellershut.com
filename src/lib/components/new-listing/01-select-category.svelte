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
  import { createEventDispatcher } from 'svelte';
  import CategoriesBody from './categories-body.svelte';
  import SlideTitle from './slide-title.svelte';

  const dispatch = createEventDispatcher();

  let searchQuery = $state('');
  const validInput = $derived(nonWhitespaceInput(searchQuery));
  const whitespaceOnly = $derived(searchQuery.length && !validInput);

  type IdExtract = Pick<Category, 'name' | 'id' | 'subCategories'>;
  let selectedCategories: IdExtract[] = $state([]);

  const pushCategory = (evt: CustomEvent<IdExtract>) => {
    selectedCategories.push(evt.detail);
  };

  let timeout: number;
  let searching = $state(false);

  let searchResults: Edge<Partial<{ category: Partial<Category>; parentName?: string }>>[] = $state(
    []
  );

  const lastItem = $derived(selectedCategories[selectedCategories.length - 1]);
  const reset = () => {
    searchResults = [];
    searching = false;
  };

  const getCategories = () => {
    if (!validInput) {
      reset();
      return;
    }

    api()
      .searchWithParentName({ first: 100 }, searchQuery)
      .then((res) => {
        searchResults = res.data?.data?.searchWithParentName.edges ?? [];
        searching = false;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = () => {
    searching = true;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(getCategories, 500);
  };

  $effect(() => {
    if (lastItem && !lastItem.subCategories?.length) {
      // send message that this slide is ok
      dispatch('slideValid', { categoryId: lastItem.id, slide: 1 });
    } else {
      dispatch('invalidate');
    }
  });
</script>

<SlideTitle title={'Category'} description={'Which category best suits your item?'} />
<div class={`grid w-full items-center gap-1.5 ${selectedCategories.length ? 'hidden' : ''}`}>
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
<div class="grid gap-1 max-h-64">
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
  <div class="h-full overflow-y-auto">
    <CategoriesBody
      bind:searching
      bind:searchQuery
      bind:searchResults
      {selectedCategories}
      on:sendCategory={pushCategory}
    />
  </div>
</div>
