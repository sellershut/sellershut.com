import { github, lucia } from '$lib/server/auth';
import { OAuth2RequestError } from 'arctic';
import { type DatabaseUser } from 'lucia';
import type { RequestEvent } from '@sveltejs/kit';
import axios from 'axios';
import { logger } from '$lib/server/logger';
import { USERS_API } from '$env/static/private';

/* const getExistingUser = async (providerAccountId: string, provider: string): Promise<DatabaseUser | undefined> => {
  const response = await axios
    .post(USERS_API, {
      query: `query userByAccount(
            $providerAccountId: String,
            $provider: String
          ) {
          userByAccount(
            providerAccountId: $providerAccountId,
            provider: $provider,
          ) {
            id,
            username,
            name,
            email,
            avatar
          }
        }`,
      variables: {
        providerAccountId,
        provider
      },
    });

  const { data } = response;
  logger.debug('existingUserByAccount', data)
  const userData = data.data.userByAccount;
  if (userData) {
    const user: DatabaseUser = {
      id: userData.id,
      attributes: {
        username: userData.username,
        email: data.email,
        avatar: data.avatar,
        name: data.name
      }
    }
    return user
  }
  return undefined

} */

const getUserByEmail = async (email: string): Promise<DatabaseUser | undefined> => {
  const response = await axios.post(USERS_API, {
    query: `query userByEmail(
            $email: String,
          ) {
          userByEmail(
            email: $email,
          ) {
            id,
            username,
            name,
            email,
            avatar
          }
        }`,
    variables: {
      email,
    },
  });

  const { data } = response;
  logger.debug('existingUserByEmail', data);
  const userData = data.data.userByEmail;
  if (userData) {
    const user: DatabaseUser = {
      id: userData.id,
      attributes: {
        username: userData.username,
        email: data.email,
        avatar: data.avatar,
        name: data.name,
      },
    };
    return user;
  }
  return undefined;
};

const createUserFn = async (
  username: string,
  email?: string,
  avatar?: string,
  name?: string
): Promise<DatabaseUser> => {
  const response = await axios.post(USERS_API, {
    query: `mutation createUser(
            $username: String,
            $email: String,
            $avatar: String,
            $name: String,
          ) {
          createUser(
            input: {
              username: $username,
              email: $email,
              avatar: $avatar
              name: $name
            }
          ) {
            id,
            username,
            email,
            avatar,
            name
          }
        }`,
    variables: {
      username,
      email,
      avatar,
      name,
    },
  });

  const data = response.data.data.createUser;
  logger.debug('createUser', data);
  const user: DatabaseUser = {
    id: data.id,
    attributes: {
      username: data.username,
      email: data.email,
      avatar: data.avatar,
      name: data.name,
    },
  };
  return user;
};

const createOauthAccount = async (user: string, provider: string, providerAccountId: string) => {
  const response = await axios.post(USERS_API, {
    query: `mutation createAccount(
            $user: String,
            $provider: String,
            $providerAccountId: String,
          ) {
          createAccount(
            input: {
              user: $user,
              provider: $provider,
              providerAccountId: $providerAccountId,
            }
          ) {
            id,
          }
        }`,
    variables: {
      user,
      provider,
      providerAccountId,
    },
  });
  return response.data.data.createAccount;
};

export async function GET(event: RequestEvent): Promise<Response> {
  const code = event.url.searchParams.get('code');
  const state = event.url.searchParams.get('state');
  const storedState = event.cookies.get('github_oauth_state') ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const headers = {
      Authorization: `Bearer ${tokens.accessToken}`,
      'User-Agent': 'my-app',
    };
    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers,
    });
    const githubUser: GitHubUser = await githubUserResponse.json();

    const emailsResponse = await fetch('https://api.github.com/user/emails', {
      headers,
    });
    const emails = await emailsResponse.json();
    logger.info(emails);

    const primaryEmail = emails.find((email: { primary: boolean }) => email.primary) ?? null;
    if (!primaryEmail) {
      return new Response('No primary email address', {
        status: 400,
      });
    }

    if (!primaryEmail.verified) {
      return new Response('Unverified email', {
        status: 400,
      });
    }

    const existingUser = await getUserByEmail(primaryEmail.email);
    logger.warn(`existing user ${existingUser?.id}`);

    if (existingUser) {
      await createOauthAccount(existingUser.id, 'github', githubUser.id.toString());
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes,
      });
    } else {
      const user: DatabaseUser = await createUserFn(
        githubUser.login,
        primaryEmail.email,
        githubUser.avatar_url,
        githubUser.name
      );
      logger.info(user, 'user created');
      await createOauthAccount(user.id, 'github', githubUser.id.toString());
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

interface GitHubUser {
  id: string;
  login: string;
  email?: string;
  avatar_url: string;
  name?: string;
}
