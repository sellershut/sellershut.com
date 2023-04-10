import {
  findCategories,
  keyNavigationCategories,
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
}) satisfies PageLoad;
