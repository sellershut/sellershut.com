<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let text: string;
  export let icon: typeof SvelteComponent;
  export let index: number;
</script>

<!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
<a
  href={'#'}
  class="px-4 py-2 text-sm inline-flex items-center justify-start gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 w-full"
  role="menuitem"
  tabindex="-1"
  id={`avatar-menu-item-${index}`}
>
  <svelte:component this={icon} class="scale-75" />
  {text}</a
>
