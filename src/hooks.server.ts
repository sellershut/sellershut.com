import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handleTheme: Handle = async ({ event, resolve }) => {
  const theme = event.cookies.get('siteTheme');
  const response = await resolve(event, {
    transformPageChunk: ({ html }) => html.replace('class=""', `class="${theme}"`),
  });

  return response;
};

export const handle = sequence(handleTheme);
export default handle;
