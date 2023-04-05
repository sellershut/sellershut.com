<script lang="ts">
  import { getSubCategories, keyRootCategories } from '$lib/api/category/query';
  import { createQuery } from '@tanstack/svelte-query';

  // This data is cached by prefetchQuery in +page.ts so no fetch actually happens here
  const query = createQuery({
    queryKey: [keyRootCategories],
    queryFn: async () => getSubCategories(),
  });
</script>

<div>{$query.isSuccess}</div>
