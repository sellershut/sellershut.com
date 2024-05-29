<script lang="ts">
import { Input } from "$lib/components/ui/input";
import { getContext } from "svelte";
import type { Writable } from "svelte/store";
import { Button } from "../ui/button";

let searchOpen: Writable<boolean> = getContext("searching");
</script>

<div
  class={`${$searchOpen ? "flex " : "hidden"} items-center w-full gap-1 justify-end`}
>
  <Input
    id="searchInput"
    type="text"
    placeholder="search sellershut.com"
    class={"w-full font-medium"}
  />
  <Button
    onmousedown={() => {
      $searchOpen = false;
    }}>Cancel</Button
  >
</div>
