<script lang="ts">
  import NavigationBar from '$components/navigation-bar/navigation-bar.svelte';
  import '../app.scss';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="bg-background/90 text-foreground">
  <NavigationBar darkMode={data.darkMode} />
  <main class="min-h-screen container overflow-x-hidden">
    <slot />
  </main>
</div>
