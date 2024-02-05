<script lang="ts">
  import NavigationBar from '$components/navigation-bar/navigation-bar.svelte';
  import { QueryClientProvider } from '@tanstack/svelte-query';
  import '../app.scss';
  import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
  import { setContext } from 'svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  setContext('darkModeEnabled', data.darkMode);
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
