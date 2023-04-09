import { findCategories, keyRootCategories } from '$lib/api/category/query';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
  const { tanstackQueryClient } = await parent();

  await tanstackQueryClient.prefetchQuery({
    queryKey: [keyRootCategories, 5],
    queryFn: () => findCategories(5, 0, 1),
  });
}) satisfies PageLoad;
