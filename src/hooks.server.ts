import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import GitHub from '@auth/core/providers/github';
import { SvelteKitAuth } from '@auth/sveltekit';
import { Driver, SellershutAdapter } from '$lib/api/auth/adapter';
import { APP_SECRET, AUTH_GITHUB_ID, AUTH_GITHUB_SECRET } from '$env/static/private';

export const handleAuth: Handle = SvelteKitAuth({
  adapter: SellershutAdapter(new Driver('http://localhost:3001')),
  providers: [GitHub({ clientId: AUTH_GITHUB_ID, clientSecret: AUTH_GITHUB_SECRET })],
  secret: '',
});

export const handleTheme: Handle = async ({ event, resolve }) => {
  const theme = event.cookies.get('siteTheme');
  const response = await resolve(event, {
    transformPageChunk: ({ html }) => html.replace('class=""', `class="${theme}"`),
  });

  return response;
};

export const handle = sequence(handleTheme, handleAuth);
export default handle;
