<script lang="ts">
import FilterSidebar from "$lib/components/filter-sidebar.svelte";
import Footer from "$lib/components/footer/footer.svelte";
import TopNav from "$lib/components/header/TopNav.svelte";
import "../app.scss";
import type { Snippet } from "svelte";

const { children }: { children: Snippet } = $props();
</script>

<div class="min-h-screen bg-secondary text-foreground duration-150 transition-colors space-y-4">
  <TopNav/>
  <div class="flex flex-row gap-2">
    <FilterSidebar/>
    <!-- Left Margin to cater for sidebar -->
    <div class="flex-1 2xl:ml-64">
      {@render children()}
    </div>
  </div>
  <Footer/>
</div>
