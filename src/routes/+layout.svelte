<script lang="ts">
  import Navbar from '$lib/components/navigation/navbar.svelte';
  import '../global.scss';
</script>

<div class="font-roboto">
  <Navbar />
  <div
    class="bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-rose-100 to-teal-100 dark:bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] dark:from-rose-900 dark:via-slate-900 dark:to-zinc-900 text-zinc-800 dark:text-zinc-100"
  >
    <div class="container">
      <slot />
    </div>
  </div>
</div>
