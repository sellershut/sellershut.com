import { redirect } from '@sveltejs/kit';
import { generateState } from 'arctic';
import { google } from '$lib/server/auth';
import type { RequestEvent } from '@sveltejs/kit';
import { logger } from '$lib/server/logger';
import { generateCodeVerifier } from 'oslo/oauth2';

export async function GET(event: RequestEvent): Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  logger.trace(state, 'creating auth url');
  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ['profile', 'https://www.googleapis.com/auth/userinfo.email'],
  });
  event.cookies.set('code_verifier', codeVerifier, {
    secure: import.meta.env.PROD,
    path: '/',
    httpOnly: true,
    maxAge: 60 * 10, // 10 min
  });

  event.cookies.set('google_oauth_state', state, {
    path: '/',
    secure: import.meta.env.PROD,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  });

  redirect(302, url.toString());
}
