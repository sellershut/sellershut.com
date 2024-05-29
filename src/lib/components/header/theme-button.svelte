<script lang="ts">
import { enhance } from "$app/forms";
import { page } from "$app/stores";
import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

import type { SubmitFunction } from "@sveltejs/kit";
import { IconColorSwatch } from "@tabler/icons-svelte";
import {
	MoonOutline,
	PhonePortraitOutline,
	SunnyOutline,
	TvOutline,
} from "svelte-ionicons";
import Button from "../ui/button/button.svelte";

const submitUpdateTheme: SubmitFunction = ({ action }) => {
	const theme = action.searchParams.get("theme");

	if (theme) {
		document.documentElement.setAttribute("data-theme", theme);
	}
};

const createRoute = (theme: string): string => {
	return `/?/setTheme&theme=${theme}&redirectTo=${$page.url.pathname}`;
};
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button size="icon" variant="ghost" builders={[builder]}>
      <IconColorSwatch stroke={1.5} />
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <form use:enhance={submitUpdateTheme} method="post">
        <DropdownMenu.Item>
          <button formaction={createRoute("dark")} class="inline-flex gap-2"
            ><MoonOutline />Dark</button
          >
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <button formaction={createRoute("light")} class="inline-flex gap-2"
            ><SunnyOutline />Light</button
          >
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <button formaction={createRoute("system")} class="inline-flex gap-2">
            <TvOutline class="hidden md:block" />
            <PhonePortraitOutline class="md:hidden" />
            System</button
          >
        </DropdownMenu.Item>
      </form>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
