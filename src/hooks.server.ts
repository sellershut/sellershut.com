import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';

const missingEnv = (variable: string) => {
  throw new Error(`MISSING '${variable}' variable in .env`);
};

if (!PUBLIC_API_ENDPOINT) {
  missingEnv('PUBLIC_API_ENDPOINT');
}

export const handleTheme = (async ({ event, resolve }) => {
  const theme = event.cookies.get('siteTheme');
  const response = await resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace('class=""', `class="${theme}"`),
  });
  return response;
}) satisfies Handle;

export const handle = sequence(handleTheme);
export default handle;
