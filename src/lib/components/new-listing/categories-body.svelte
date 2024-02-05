<script lang="ts">
  import { Button } from '$components/ui/button';
  import LoadingSpinner from '$components/ui/loading-spinner.svelte';
  import type { Category } from '$lib/api/categories';
  import { api } from '$lib/api/categories/api';
  import type { Edge, GraphQLPaginatedResult } from '$lib/api/response/graphql';
  import { nonWhitespaceInput } from '$lib/utils';
  import { createQuery } from '@tanstack/svelte-query';
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';

  const { selectedCategories, searchQuery, searching, searchResults } = $props<{
    selectedCategories: Pick<Category, 'id' | 'name'>[];
    searchQuery: string;
    searching: boolean;
    searchResults: Edge<Partial<{ category: Partial<Category>; parentName?: string }>>[];
  }>();
  const parent = $derived(selectedCategories[selectedCategories.length - 1]?.id ?? null);

  const validInput = $derived(nonWhitespaceInput(searchQuery));

  const cats = $derived(
    createQuery<GraphQLPaginatedResult<Partial<Category>>, Error>({
      queryKey: ['subCategory', parent],
      queryFn: () => api().getSubCategories({ first: 100 }, parent),
    })
  );

  const dispatch = createEventDispatcher();

  const sendCategory = (name: string, id: string, parentId?: string) => {
    dispatch('sendCategory', { name, id, parentId });
  };
</script>

{#if !validInput || (!searching && selectedCategories.length)}
  {#each $cats.data?.data?.data?.subCategories.edges ?? [] as { node }, index}
    <div transition:fly={{ y: 50, duration: index * 300, delay: 100 }} class="w-full">
      <Button
        variant="outline"
        class="text-xs justify-start gap-2 text-wrap text-foreground w-full"
        on:click={() => {
      sendCategory(node.name!, node.id!, node.parentId);
      }}
      >
        {node.name}
      </Button>
    </div>
  {/each}
{:else if searching}
  <LoadingSpinner />
{:else if !selectedCategories.length}
  {#each searchResults as { node: { category, parentName } }, index}
    <div transition:fly={{ y: 50, duration: index * 300, delay: 100 }} class="w-full">
      <Button
        variant="outline"
        class="text-xs justify-start gap-2 text-wrap text-foreground w-full"
        on:click={() => {
  sendCategory(category!.name!, category!.id!, category?.parentId);
}}
      >
        {category?.name}
        <span class="text-muted-foreground">{parentName ? ` in ${parentName}` : ''}</span>
      </Button>
    </div>
  {/each}
{/if}
