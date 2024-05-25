import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

export const handlePreload = (async ({ event, resolve }) => {
	return await resolve(event, {
		preload: ({ type }) => type === "font" || type === "js" || type === "css",
	});
}) satisfies Handle;

export const handleTheme = (async ({ event, resolve }) => {
	let theme: string | null = null;

	const newTheme = event.url.searchParams.get("theme");

	const cookieTheme = event.cookies.get("siteTheme");

	if (newTheme) {
		theme = newTheme;
	} else if (cookieTheme) {
		theme = cookieTheme;
	}

	if (theme) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => {
				return html.replace('data-theme=""', `data-theme="${theme}"`);
			},
		});
	}

	return await resolve(event);
}) satisfies Handle;

export const handle = sequence(handlePreload, handleTheme);
export default handle;
