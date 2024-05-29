<script lang="ts">
import { Button } from "$lib/components/ui/button/index.js";
import * as Sheet from "$lib/components/ui/sheet/index.js";
import { getContext } from "svelte";
import type { Writable } from "svelte/store";

let menuOpen: Writable<boolean> = getContext("menuOpen");
</script>

<Sheet.Root bind:open={$menuOpen}>
  <Sheet.Trigger asChild let:builder>
    <Button
      onmousedown={() => {
        $menuOpen = !$menuOpen;
      }}
      builders={[builder]}
      variant="ghost"
      class="absolute top-0 bottom-0 left-0 m-auto"
    >
      <div
        class="absolute m-auto top-0 bottom-0 left-0 h-8 w-8 scale-75 md:hidden"
      >
        <span
          class={`absolute transition-all duration-300 ${$menuOpen ? "top-[14px] -translate-x-4 rotate-45" : "top-1/2 -translate-x-1/2 -translate-y-1.5"}  h-[2px] w-10/12 rounded-lg bg-foreground`}
        ></span>
        <span
          class={`absolute transition-all duration-300 ${$menuOpen ? "top-[14px] -translate-x-4 -rotate-45" : "top-1/2 -translate-x-1/2 translate-y-1.5"} h-[2px] w-10/12 rounded-lg bg-foreground`}
        ></span>
      </div>
    </Button>
  </Sheet.Trigger>
  <Sheet.Content side="right">
    <Sheet.Header>
      <Sheet.Title>Edit profile</Sheet.Title>
      <Sheet.Description>
        Make changes to your profile here. Click save when you're done.
      </Sheet.Description>
    </Sheet.Header>
    <Sheet.Footer>
      <Sheet.Close asChild let:builder>
        <Button builders={[builder]} type="submit">Save changes</Button>
      </Sheet.Close>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>
