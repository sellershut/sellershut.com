<script lang="ts">
import { cn } from "$lib/utils";
import { IconDots } from "@tabler/icons-svelte";
import type { HTMLAttributes } from "svelte/elements";

type $$Props = HTMLAttributes<HTMLSpanElement>;

let className: $$Props["class"] = undefined;
export { className as class };
</script>

<span
	aria-hidden={true}
	class={cn("flex h-9 w-9 items-center justify-center", className)}
	{...$$restProps}
>
	<IconDots class="h-4 w-4 text-foreground" />
	<span class="sr-only">More pages</span>
</span>
