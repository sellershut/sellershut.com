import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
  const theme = event.cookies.get('siteTheme');
  const response = await resolve(event, {
    transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`),
  });

  return response;
}) satisfies Handle;

export default handle;
