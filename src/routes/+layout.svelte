<script lang="ts">
  import NavigationBar from '$components/navigation-bar/navigation-bar.svelte';
  import '../app.scss';
</script>

<NavigationBar />
<div class="min-h-screen container">
  <slot />
</div>
