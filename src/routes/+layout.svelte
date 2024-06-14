<script lang="ts">
import Footer from "$lib/components/footer/footer.svelte";
import TopNav from "$lib/components/header/TopNav.svelte";
import "../app.scss";
import { page } from "$app/stores";
import { type Snippet, getContext, setContext } from "svelte";
import { type Writable, writable } from "svelte/store";
import type { LayoutData } from "./$types";

let windowWidth = $state(0);
const { children, data }: { children: Snippet; data: LayoutData } = $props();

setContext("exploreParams", writable(""));
setContext("sliderCategories", writable(data.parentCategories));
let exploreParams: Writable<string | null> = getContext("exploreParams");

$effect(() => {
	page.subscribe((page) => {
		$exploreParams = page.url.searchParams.get("explore");
	});
});
</script>
<svelte:window bind:outerWidth={windowWidth} />

<div class="min-h-screen bg-secondary text-foreground duration-150 transition-colors space-y-4">
  <TopNav/>
  <div class="flex flex-row gap-2">
    {#if $exploreParams}
      {#await import("$lib/components/filter-sidebar.svelte") then Module}
        <Module.default/>
      {/await}
    {/if}
    <!-- Left Margin to cater for sidebar -->
    <div class={`flex-1 ${$exploreParams?.length ? '2xl:ml-64' : ''}`}>
      {@render children()}
    </div>
  </div>
  {#if windowWidth < 768}
    {#await import("$lib/components/header/mobile-nav.svelte") then Module}
      <Module.default/>
    {/await}
  {/if}
  <Footer/>
</div>
