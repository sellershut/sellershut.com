<script lang="ts">
  const setTheme = (theme: string) => {
    document.documentElement.setAttribute('class', theme);
    document.cookie = `siteTheme=${theme};max-age=31557600;path='/'`;
  };
</script>

<a href={'#'} on:click={() => setTheme('dark')}>Dark</a>
<a href={'#'} on:click={() => setTheme('light')}>Light</a>
