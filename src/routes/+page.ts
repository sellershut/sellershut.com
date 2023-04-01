import getSubCategories from '$lib/api/category/query/subCategories';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
  const { queryClient } = await parent();
  await queryClient.prefetchQuery({
    queryKey: ['rootCategories'],
    queryFn: () => getSubCategories(),
  });
};
