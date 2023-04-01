<script lang="ts">
  import { onMount } from 'svelte';
  import IconMoon from './icons/icon-moon.svelte';
  import IconSun from './icons/icon-sun.svelte';

  let ready = false;
  let isDark = false;

  const setTheme = (theme: string) => {
    document.documentElement.setAttribute('class', theme);
    document.cookie = `siteTheme=${theme};max-age=31557600;path='/'`;
  };

  onMount(() => {
    isDark = document.documentElement.classList.contains('dark');
    ready = true;
  });
</script>

{#if ready}
  {#if isDark}
    <a
      href={'#'}
      on:click={() => {
        setTheme('light');
        isDark = false;
      }}><IconMoon class="ml-auto mr-0" /></a
    >
  {:else}
    <a
      href={'#'}
      on:click={() => {
        setTheme('dark');
        isDark = true;
      }}><IconSun class="ml-auto mr-0" /></a
    >
  {/if}
{/if}
