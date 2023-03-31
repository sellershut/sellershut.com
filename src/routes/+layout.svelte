<script lang="ts">
  import Navbar from '$lib/components/navigation/navbar.svelte';
  import '../global.scss';
</script>

<Navbar />
<div class="bg-primary dark:bg-secondary font-light">
  <div class="container">
    <slot />
  </div>
</div>
