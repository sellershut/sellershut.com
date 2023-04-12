import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { SvelteKitAuth } from '@auth/sveltekit';
import { DatabaseAdapter } from '$lib/api/database-adapter';
import Google from '@auth/core/providers/google';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import {
  APP_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '$env/static/private';

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

const handleAuth = (async (...args) => {
  const [{ event }] = args;
  return SvelteKitAuth({
    trustHost: true,
    debug: true,
    secret: APP_SECRET,
    adapter: DatabaseAdapter,
    providers: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Google({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
      }),
    ],
  })(...args);
}) satisfies Handle;

export const handle = sequence(handleTheme, handleAuth);
export default handle;
