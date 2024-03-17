<script lang="ts">
  import { Button } from '$components/ui/button';
  import Listing from '$components/ui/listing.svelte';
  import { api as apiListings } from '$lib/api/listings/api';
  import { type Listing as ListingType } from '$lib/types/listing';
  import type { GraphQLPaginatedResult } from '$lib/api/response/graphql';
  import { createInfiniteQuery, createQuery } from '@tanstack/svelte-query';
  import { api as apiCategories } from '$lib/api/categories/api';
  import type { Category } from '$lib/types/category';
  import { page } from '$app/stores';

  const cats = $derived(
    createQuery<GraphQLPaginatedResult<Partial<Category>>, Error>({
      queryKey: ['subCategory', undefined],
      queryFn: () => apiCategories().getSubCategories({ first: 100 }, undefined),
    })
  );

  const parentId = $derived(
    $cats.data?.data.data.subCategories.edges.find(
      ({ node }) => node.name === $page.url.searchParams.get('explore')
    )?.node.id ?? undefined
  );
  const query = $derived(
    createInfiniteQuery({
      queryKey: ['listings', parentId],
      queryFn: ({ pageParam }) => apiListings().getListings({ after: pageParam }, parentId),
      initialPageParam: undefined,
      getNextPageParam: (lastPage: GraphQLPaginatedResult<Partial<ListingType>>) => {
        const edges = lastPage.data.data?.listings?.edges;
        if (edges.length) {
          const last = edges[edges.length - 1];
          return last.cursor;
        }
        return undefined;
      },
    })
  );

  const pages: GraphQLPaginatedResult<Partial<ListingType>>[] | [] = $derived(
    $query.data?.pages ?? []
  );
</script>

<section class="px-5 py-8 mx-auto">
  <ul class="flex flex-wrap -m-4">
    {#each pages as queryPage}
      {#each queryPage.data.data.listings.edges as edge}
        <Listing listing={edge.node} />
      {/each}
    {/each}
  </ul>
</section>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Button variant="outline">Button</Button>
