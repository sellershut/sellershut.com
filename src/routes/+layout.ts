import { QueryClient } from '@tanstack/svelte-query';
import { browser } from '$app/environment';
import type { LayoutLoad } from './$types';

export const load = (({ data }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
      },
    },
  });
  return { tanstackQueryClient: queryClient, session: data.session };
}) satisfies LayoutLoad;
