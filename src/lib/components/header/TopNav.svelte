<script lang="ts">
import { IconSearch } from "@tabler/icons-svelte";
import { setContext } from "svelte";
import { writable } from "svelte/store";
import { Button } from "../ui/button";
import NavSearch from "./nav-search.svelte";
import SellershutButton from "./sellershut-logo-button.svelte";
import ThemeButton from "./theme-button.svelte";

let searchOpen = writable(true);
setContext("searching", searchOpen);
</script>

<header
  class="navigation-bar min-h-11 sticky top-0 flex items-center px-2 gap-2 shadow"
>
  <NavSearch />
  <div class={`${$searchOpen ? "hidden" : "flex-1"} flex`}>
    <SellershutButton />
    <div class="flex-1 flex justify-end">
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
