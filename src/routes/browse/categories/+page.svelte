<script lang="ts">
  import type { CategoriesResult } from '$lib/@types/category';
  import { findCategories, keyRootCategories } from '$lib/api/category/query';
  import CategoriesList from '$lib/components/categories/categories-list.svelte';
  import { createQuery } from '@tanstack/svelte-query';

  const categories = createQuery<CategoriesResult, Error>({
    queryKey: [keyRootCategories],
    queryFn: () =>
      findCategories(
        keyRootCategories.max,
        keyRootCategories.parentId,
        keyRootCategories.page,
        keyRootCategories.returnImages,
      ),
  });
</script>

<div class="pt-10">
  <CategoriesList {categories} />
</div>
