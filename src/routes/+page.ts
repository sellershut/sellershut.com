import {
  findCategories,
  keyNavigationCategories,
  keyFeaturedCategories,
} from '$lib/api/category/query';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
  const { tanstackQueryClient } = await parent();

  await tanstackQueryClient.prefetchQuery({
    queryKey: [keyNavigationCategories],
    queryFn: () =>
      findCategories(
        keyNavigationCategories.max,
        keyNavigationCategories.parentId,
        keyNavigationCategories.page,
      ),
  });

  await tanstackQueryClient.prefetchQuery({
    queryKey: [keyFeaturedCategories],
    queryFn: () =>
      findCategories(
        keyFeaturedCategories.max,
        keyFeaturedCategories.parentId,
        keyFeaturedCategories.page,
        keyFeaturedCategories.returnImages,
      ),
  });
}) satisfies PageLoad;
