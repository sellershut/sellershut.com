<script lang="ts">
  import { Button } from '$components/ui/button';
  import Listing from '$components/ui/listing.svelte';
  import { api } from '$lib/api/listings/api';
  import type { GraphQLPaginatedResult } from '$lib/api/response/graphql';
  import { createInfiniteQuery } from '@tanstack/svelte-query';

  const query = createInfiniteQuery({
    queryKey: ['listings'],
    queryFn: ({ pageParam }) => api().getListings({ after: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage: GraphQLPaginatedResult<Partial<Listing>>) => {
      const edges = lastPage.data.data?.listings.edges;
      if (edges.length) {
        const last = edges[edges.length - 1];
        return last.cursor;
      }
      return undefined;
    },
  });

  const pages: GraphQLPaginatedResult<Partial<Listing>>[] | [] = $derived($query.data?.pages ?? []);
</script>

<section class="px-5 py-8 mx-auto">
  <ul class="flex flex-wrap -m-4">
    {#each pages as page}
      {#each page as item}
        <Listing aa  />
      {/each}
    {/each}
    <Listing />
    <Listing />
    <Listing />
    <Listing />
    <Listing />
    <Listing />
    <Listing />
    <Listing />
    <Listing />
    <Listing />
    <Listing />
    <Listing />
  </ul>
</section>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Button variant="outline">Button</Button>
