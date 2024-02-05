<script lang="ts">
  import { Button } from '$components/ui/button';
  import { Moon, Sun } from 'radix-icons-svelte';
  import { getContext } from 'svelte';

  let darkMode = getContext<boolean>('darkModeEnabled');

  let darkModeEnabled = $state(darkMode);

  function setTheme(isDark: boolean) {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('class', theme);
    document.cookie = `siteTheme=${theme};max-age=31557600;path='/';SameSite=Strict`;
  }
</script>

<Button
  variant="outline"
  on:click={() => {
    darkModeEnabled = !darkModeEnabled;
    setTheme(darkModeEnabled);
  }}
>
  {#if darkModeEnabled}
    <Sun />
  {:else}
    <Moon />
  {/if}
</Button>
