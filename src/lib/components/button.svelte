<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let text: string;
  export let icon: typeof SvelteComponent | undefined;
  export let styles = '';
  export let isPrimary = true;
  export let eventHandler = () => {};
</script>

<button
  on:click={eventHandler}
  class={`${
    isPrimary
      ? 'bg-rose-500 hover:bg-rose-600 text-zinc-200'
      : 'bg-zinc-300 border border-zinc-400 shadow drop-shadow dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 hover:bg-zinc-200'
  }  font-bold py-2 px-4 rounded inline-flex items-center transition duration-300`}
>
  {#if icon}
    <svelte:component this={icon} class={`${styles} w-4 h-4 mr-2`} />
  {/if}
  <span>{text}</span>
</button>
