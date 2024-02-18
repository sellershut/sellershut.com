import { google, lucia } from '$lib/server/auth';
import { OAuth2RequestError } from 'arctic';
import { type DatabaseUser } from 'lucia';
import type { RequestEvent } from '@sveltejs/kit';
import { logger } from '$lib/server/logger';
import { parseJWT } from 'oslo/jwt';
import {
  createOauthAccount,
  createUserFn,
  getUserByEmail,
  usernameFromEmail,
} from '$lib/api/auth/auth-adapter';

type GoogleUser = {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  nonce: string;
  iat: number;
  exp: number;
  picture: string;
  given_name: string;
  family_name: string;
};

export async function GET(event: RequestEvent): Promise<Response> {
  const code = event.url.searchParams.get('code');
  const state = event.url.searchParams.get('state');
  const storedState = event.cookies.get('google_oauth_state') ?? null;
  const codeVerifier = event.cookies.get('code_verifier') ?? null;

  if (!code || !state || !storedState || state !== storedState || !codeVerifier) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const jwt = parseJWT(tokens.idToken);
    logger.debug(jwt?.payload, 'payload');

    if (!jwt) {
      return new Response('Payload is null', {
        status: 400,
      });
    }

    const googleUser = jwt.payload as GoogleUser;

    if (!googleUser.email_verified) {
      return new Response('Unverified email', {
        status: 400,
      });
    }

    const existingUser = await getUserByEmail(googleUser.email);
    logger.warn(`existing user ${existingUser?.id}`);

    if (existingUser) {
      await createOauthAccount(existingUser.id, 'google', googleUser.email);
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes,
      });
    } else {
      const user: DatabaseUser = await createUserFn(
        usernameFromEmail(googleUser.email),
        googleUser.email,
        googleUser.picture,
        `${googleUser.given_name} ${googleUser.family_name}`
      );
      logger.info(user, 'user created');
      await createOauthAccount(user.id, 'google', googleUser.email);
      const session = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes,
      });
    }
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    });
  } catch (e) {
    logger.error(e);
    if (e instanceof OAuth2RequestError && e.message === 'bad_verification_code') {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}
