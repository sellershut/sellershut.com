<script lang="ts">
import Footer from "$lib/components/footer/footer.svelte";
import TopNav from "$lib/components/header/TopNav.svelte";
import "../app.scss";
import { page } from "$app/stores";
import { type Snippet, getContext, setContext } from "svelte";
import { type Writable, writable } from "svelte/store";

const { children }: { children: Snippet } = $props();

setContext("exploreParams", writable(""));
let exploreParams: Writable<string | null> = getContext("exploreParams");

$effect(() => {
	page.subscribe((page) => {
		$exploreParams = page.url.searchParams.get("explore");
	});
});
</script>

<div class="min-h-screen bg-secondary text-foreground duration-150 transition-colors space-y-4">
  <TopNav/>
  <div class="flex flex-row gap-2">
    {#if $exploreParams}
      {#await import("$lib/components/filter-sidebar.svelte") then Module}
        <Module.default/>
      {/await}
    {/if}
    <!-- Left Margin to cater for sidebar -->
    <div class="flex-1 2xl:ml-64">
      {@render children()}
    </div>
  </div>
  <Footer/>
</div>
