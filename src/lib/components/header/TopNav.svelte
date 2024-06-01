<script lang="ts">
import { page } from "$app/stores";
import { IconSearch } from "@tabler/icons-svelte";
import { setContext } from "svelte";
import { writable } from "svelte/store";
import { Button } from "../ui/button";
import MenuIcon from "./menu-icon.svelte";
import NavSearch from "./nav-search.svelte";
import SellershutButton from "./sellershut-logo-button.svelte";
import ThemeButton from "./theme-button.svelte";

let windowWidth = $state(0);
let searchOpen = writable(false);
let menuOpen = writable(false);
setContext("searching", searchOpen);
setContext("menuOpen", menuOpen);

// NOTE: may need to group the layouts
const isRootPage = $derived(
	$page.route.id === "/" ||
		$page.route.id === "/(app)" ||
		$page.route.id === "/(app)/(explore)",
);
</script>

<svelte:window bind:outerWidth={windowWidth} />

<header
  class="navigation-bar min-h-11 sticky top-0 flex flex-col justify-center space-y-1 py-2"
>
  <div class="md:container flex items-center gap-2">
    <NavSearch />
    <div class={`${$searchOpen ? "hidden" : "flex-1"} flex relative`}>
      <MenuIcon />
      <SellershutButton />
      <div
        class="absolute right-0 -top-[6px] bottom-0 m-auto flex items-center"
      >
        <Button size="icon" variant="ghost">
          <IconSearch
            onmousedown={() => {
              $menuOpen = false;
              $searchOpen = true;
            }}
            stroke={1.5}
          />
        </Button>
        {#if windowWidth > 768}
          {#await import("$lib/components/header/desktop-nav-items.svelte") then Module}
            <Module.default />
          {/await}
        {/if}
        <ThemeButton />
      </div>
    </div>
  </div>
  {#if isRootPage}
    {#await import("$lib/components/header/categories-slider.svelte") then Module}
      <Module.default />
    {/await}
  {/if}
</header>
