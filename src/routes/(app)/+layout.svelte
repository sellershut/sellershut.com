<script lang="ts">
  import '../../app.scss';
  import NavigationBar from '$components/navigation-bar/navigation-bar.svelte';
  import { QueryClientProvider } from '@tanstack/svelte-query';
  import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
  import { setContext } from 'svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  setContext('darkModeEnabled', data.darkMode);
  setContext('sessionUser', data.user);
  setContext('sessionData', data.session);
</script>

<QueryClientProvider client={data.queryClient}>
  <div class="bg-background text-foreground">
    <NavigationBar />
    <main class="min-h-screen container overflow-x-hidden">
      <slot />
    </main>
  </div>
  <SvelteQueryDevtools />
</QueryClientProvider>
