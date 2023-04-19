<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let modalLayout: typeof SvelteComponent;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  on:click|self
  class="bg-red-500 fixed top-0 left-0 right-0 bottom-0 z-[99]"
>
  <div>
    <svelte:component this={modalLayout} on:click />
  </div>
</div>
