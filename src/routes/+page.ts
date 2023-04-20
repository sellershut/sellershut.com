import {
  findCategories,
  keyNavigationCategories,
  keyFeaturedCategories,
  keyRootCategories,
} from '$lib/api/category/query';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
  const { tanstackQueryClient, session } = await parent();

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

  await tanstackQueryClient.prefetchQuery({
    queryKey: [keyRootCategories],
    queryFn: () =>
      findCategories(
        keyRootCategories.max,
        keyRootCategories.parentId,
        keyRootCategories.page,
        keyRootCategories.returnImages,
      ),
  });

  return { tanstackQueryClient, session };
}) satisfies PageLoad;
