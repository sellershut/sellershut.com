<script lang="ts">
  import '../stylesheet.scss';
  import { QueryClientProvider } from '@tanstack/svelte-query';
  import NavigationBar from '$lib/components/navigation/navigation-bar.svelte';
  import type { SvelteComponent } from 'svelte';
  import Modal from '$lib/components/modal.svelte';
  import { modal } from '$lib/util/stores/modal';
  import type { PageData } from './$types';

  // pass in component as parameter and toggle modal state
  const toggleModal = (component: typeof SvelteComponent) => {
    $modal = {
      isVisible: !$modal.isVisible,
      content: component,
    };
  };

  // initialise modal state and content
  export let data: PageData;
</script>

<QueryClientProvider client={data.tanstackQueryClient}>
  <NavigationBar />
  <main
    class="bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-rose-50 to-zinc-100
    dark:bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] dark:from-rose-900
    dark:via-slate-900 dark:to-zinc-900 text-zinc-800 dark:text-zinc-300"
  >
    <slot />
  </main>

  {#if $modal.isVisible && $modal.content}
    <Modal on:click={toggleModal} modalContent={$modal.content} />
  {/if}
</QueryClientProvider>
