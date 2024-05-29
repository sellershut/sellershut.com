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
setContext("searching", searchOpen);
</script>

<header
  class="navigation-bar min-h-11 sticky top-0 flex items-center px-2 gap-2 shadow"
>
  <NavSearch />
  <div class={`${$searchOpen ? "hidden" : "flex-1"} flex relative`}>
    <MenuIcon/>
    <SellershutButton />
    <div class="absolute right-0 -top-[6px] bottom-0 m-auto">
      <Button size="icon" variant="ghost">
        <IconSearch
          onmousedown={() => {
            $searchOpen = true;
          }}
          stroke={1.5}
        />
      </Button>
      <ThemeButton />
    </div>
  </div>
</header>
