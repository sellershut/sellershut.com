<script lang="ts">
import { enhance } from "$app/forms";
import { page } from "$app/stores";
import type { SubmitFunction } from "@sveltejs/kit";

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

<form
  use:enhance={submitUpdateTheme}
  method="post"
  class="flex gap-2 list-none"
>
  <li><button formaction={createRoute("dark")}>Dark</button></li>
  <li><button formaction={createRoute("light")}>Light</button></li>
  <li><button formaction={createRoute("system")}>System</button></li>
</form>
