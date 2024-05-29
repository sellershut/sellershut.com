<script lang="ts">
import { getContext } from "svelte";
import type { Writable } from "svelte/store";

let menuOpen: Writable<boolean> = getContext("menuOpen");
</script>

<button
  class="absolute m-auto top-0 bottom-0 left-0 h-8 w-8 scale-75 md:hidden"
  onmousedown={() => {
    $menuOpen = !$menuOpen;
  }}
>
  <span
    class={`absolute transition-all duration-300 ${$menuOpen ? "top-[14px] -translate-x-4 rotate-45" : "top-1/2 -translate-x-1/2 -translate-y-1.5"}  h-[2px] w-10/12 rounded-lg bg-foreground`}
  ></span>
  <span
    class={`absolute transition-all duration-300 ${$menuOpen ? "top-[14px] -translate-x-4 -rotate-45" : "top-1/2 -translate-x-1/2 translate-y-1.5"} h-[2px] w-10/12 rounded-lg bg-foreground`}
  ></span>
</button>
