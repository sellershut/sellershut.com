<script lang="ts">
import { cn } from "$lib/utils.js";
// biome-ignore lint/style/useImportType: <explanation>
import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
import { ChevronForwardOutline } from "svelte-ionicons";

type $$Props = DropdownMenuPrimitive.SubTriggerProps & {
	inset?: boolean;
};
type $$Events = DropdownMenuPrimitive.SubTriggerEvents;

const className: $$Props["class"] = undefined;
export const inset: $$Props["inset"] = undefined;
export { className as class };
</script>

<DropdownMenuPrimitive.SubTrigger
  class={cn(
    "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-accent data-[state=open]:bg-accent data-[highlighted]:text-accent-foreground data-[state=open]:text-accent-foreground",
    inset && "pl-8",
    className,
  )}
  {...$$restProps}
  on:click
  on:keydown
  on:focusin
  on:focusout
  on:pointerleave
  on:pointermove
>
  <slot />
  <ChevronForwardOutline class="ml-auto h-4 w-4" />
</DropdownMenuPrimitive.SubTrigger>
