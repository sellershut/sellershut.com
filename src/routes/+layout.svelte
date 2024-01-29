<script lang="ts">
  import NavigationBar from '$components/navigation-bar/navigation-bar.svelte';
  import '../app.scss';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="bg-background/90 text-foreground overflow-x-hidden">
  <NavigationBar darkMode={data.darkMode} />
  <main class="min-h-screen container">
    <slot />
  </main>
</div>
