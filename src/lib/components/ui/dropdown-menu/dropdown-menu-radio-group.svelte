<script lang="ts">
// biome-ignore lint/style/useImportType: <explanation>
import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

type $$Props = DropdownMenuPrimitive.RadioGroupProps;

export let value: $$Props["value"] = undefined;
</script>

<DropdownMenuPrimitive.RadioGroup {...$$restProps} bind:value>
  <slot />
</DropdownMenuPrimitive.RadioGroup>
