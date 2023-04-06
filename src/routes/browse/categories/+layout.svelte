<script lang="ts">
  import { getSubCategories, keyRootCategories } from '$lib/api/category/query';
  import CategoryList from '$lib/components/categories/category-list.svelte';
  import { createQuery } from '@tanstack/svelte-query';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  const { session } = data;

  // This data is cached by prefetchQuery in +page.ts so no fetch actually happens here
  const query = createQuery({
    queryKey: [keyRootCategories],
    queryFn: async () => getSubCategories(),
  });
</script>

<div class="pt-16">
  {#if $query.isSuccess}
    <CategoryList categories={$query.data} />
  {/if}
  <slot />
  {session && session.user && session?.user.name}
</div>
