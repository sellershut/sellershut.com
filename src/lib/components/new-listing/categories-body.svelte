<script lang="ts">
  import { Button } from '$components/ui/button';
  import type { Category } from '$lib/api/categories';
  import { api } from '$lib/api/categories/api';
  import type { GraphQLPaginatedResult } from '$lib/api/response/graphql';
  import { createQuery } from '@tanstack/svelte-query';
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';

  const { selectedCategories } = $props<{ selectedCategories: Pick<Category, 'id' | 'name'>[] }>();
  const parent = $derived(selectedCategories[selectedCategories.length - 1]?.id ?? null);

  const cats = $derived(
    createQuery<GraphQLPaginatedResult<Partial<Category>>, Error>({
      queryKey: ['subCategory', parent],
      queryFn: () => api().getSubCategories({ first: 100 }, parent),
    })
  );

  const dispatch = createEventDispatcher();

  const sendCategory = (name: string, id: string) => {
    dispatch('sendCategory', { name, id });
  };
</script>

{#each $cats.data?.data?.data?.subCategories.edges ?? [] as { node }, index}
  <div transition:fly={{ y: 50, duration: index * 300, delay: 100 }} class="w-full">
    <Button
      variant="outline"
      class="text-xs justify-start gap-2 text-wrap text-foreground w-full"
      on:click={() => {
      sendCategory(node.name!, node.id!);
      }}
    >
      {node.name}
    </Button>
  </div>
{/each}
