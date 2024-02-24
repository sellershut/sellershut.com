import { api } from '$lib/api/categories/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
  const { queryClient } = await parent();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['slider-categories'],
      queryFn: () => api().getParentCategories({ first: 100 }),
    }),
    queryClient.prefetchQuery({
      queryKey: ['root-categories'],
      queryFn: () => api().getSubCategories({ first: 100 }),
    }),
  ]);
};
