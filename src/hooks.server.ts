import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { DatabaseAdapter } from '$lib/shared/database-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { APP_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

export const handleTheme = (async ({ event, resolve }) => {
  const theme = event.cookies.get('siteTheme');
  const response = await resolve(event, {
    transformPageChunk: ({ html }) => html.replace('class=""', `class="${theme}"`),
  });

  return response;
}) satisfies Handle;

export const handleAuth = (async (...args) =>
  SvelteKitAuth({
    trustHost: true,
    adapter: DatabaseAdapter,
    providers: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Google({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
      }),
    ],
    secret: APP_SECRET,
  })(...args)) satisfies Handle;

export const handle = sequence(handleTheme, handleAuth);
export default handle;
