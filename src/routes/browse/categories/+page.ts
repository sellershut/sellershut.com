import { findCategories, keyRootCategories } from '$lib/api/category/query';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
  const { tanstackQueryClient } = await parent();

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
}) satisfies PageLoad;
