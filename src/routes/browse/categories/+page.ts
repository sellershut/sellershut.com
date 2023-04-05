import { getSubCategories, keyRootCategories } from '$lib/api/category/query';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
  const { queryClient } = await parent();
  await queryClient.prefetchQuery({
    queryKey: [keyRootCategories],
    queryFn: async () => getSubCategories(),
  });
};
