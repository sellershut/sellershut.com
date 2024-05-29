<script lang="ts">
import FilterSidebar from "$lib/components/filter-sidebar.svelte";
import Footer from "$lib/components/footer/footer.svelte";
import TopNav from "$lib/components/header/TopNav.svelte";
import "../app.scss";
import type { Snippet } from "svelte";

const { children }: { children: Snippet } = $props();
</script>

<div class="min-h-screen bg-muted text-foreground duration-150 transition-colors space-y-4">
<TopNav/>
  <div class="flex flex-row gap-2">
<FilterSidebar/>
    <div>
{@render children()}
</div>
</div>
  <Footer/>
</div>
