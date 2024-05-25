import { type Actions, redirect } from "@sveltejs/kit";

export const actions: Actions = {
	setTheme: async ({ url, cookies }) => {
		const theme = url.searchParams.get("theme");
		const redirectTo = url.searchParams.get("redirectTo");
		console.log("theme", theme);

		if (theme) {
			cookies.set("siteTheme", theme, {
				path: "/",
				maxAge: 60 * 60 * 24 * 365.25,
			});
		}

		throw redirect(303, redirectTo ?? "/");
	},
};
