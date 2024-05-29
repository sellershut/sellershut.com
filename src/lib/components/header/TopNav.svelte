<script lang="ts">
import { IconSearch } from "@tabler/icons-svelte";
import { setContext } from "svelte";
import { writable } from "svelte/store";
import { Button } from "../ui/button";
import MenuIcon from "./menu-icon.svelte";
import NavSearch from "./nav-search.svelte";
import SellershutButton from "./sellershut-logo-button.svelte";
import ThemeButton from "./theme-button.svelte";

let searchOpen = writable(false);
let menuOpen = writable(false);
setContext("searching", searchOpen);
setContext("menuOpen", menuOpen);
</script>

<header
  class="navigation-bar min-h-11 sticky top-0 flex flex-col justify-center space-y-1 py-2"
>
  <div class="md:container flex items-center gap-2">
    <NavSearch />
    <div class={`${$searchOpen ? "hidden" : "flex-1"} flex relative`}>
      <MenuIcon />
      <SellershutButton />
      <div class="absolute right-0 -top-[6px] bottom-0 m-auto">
        <Button size="icon" variant="ghost">
          <IconSearch
            onmousedown={() => {
              $menuOpen = false;
              $searchOpen = true;
            }}
            stroke={1.5}
          />
        </Button>
        <ThemeButton />
      </div>
    </div>
  </div>
  <div class="flex items-center justify-center">
    <div>Filter</div>
  </div>
</header>
