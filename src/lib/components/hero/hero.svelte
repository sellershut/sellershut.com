<script lang="ts">
  import type { CategoriesResult } from '$lib/@types/category';
  import {
    keyFeaturedCategories,
    findCategories,
  } from '$lib/api/category/query';
  import { createQuery } from '@tanstack/svelte-query';

  const categories = createQuery<CategoriesResult, Error>({
    queryKey: [keyFeaturedCategories],
    queryFn: () =>
      findCategories(
        keyFeaturedCategories.max,
        keyFeaturedCategories.parentId,
        keyFeaturedCategories.page,
      ),
  });
</script>

<div>Top Categories</div>
