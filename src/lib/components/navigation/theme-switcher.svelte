<script lang="ts">
  import { onMount } from 'svelte';
  import IconSun from '../icons/icon-sun.svelte';
  import IconMoon from '../icons/icon-moon.svelte';

  let ready = false;
  let isDark = false;

  const setTheme = (theme: 'light' | 'dark') => {
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
      }}><IconSun class="ml-auto mr-0" /></a
    >
  {:else}
    <a
      href={'#'}
      on:click={() => {
        setTheme('dark');
        isDark = true;
      }}><IconMoon class="ml-auto mr-0" /></a
    >
  {/if}
{/if}
