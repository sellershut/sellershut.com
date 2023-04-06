<script lang="ts">
  import '../global.scss';
  import Navbar from '$lib/components/navigation/navbar.svelte';
  import { QueryClientProvider } from '@tanstack/svelte-query';
  import { page } from '$app/stores';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<QueryClientProvider client={data.queryClient}>
  <main class="font-roboto">
    <Navbar session={$page.data.session} />
    <div
      class="bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-rose-50 to-zinc-100
    dark:bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] dark:from-rose-900
    dark:via-slate-900 dark:to-zinc-900 text-zinc-800 dark:text-zinc-300"
    >
      <div class="container">
        <slot />
      </div>
    </div>
  </main>
</QueryClientProvider>
