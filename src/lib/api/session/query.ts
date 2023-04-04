import type { AdapterSession, AdapterUser } from '@auth/core/adapters';
import axios from 'axios';
import { throwAuthError } from '$lib/shared/throw-auth-error';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { convertToAdapterSession } from './mutation';

export const adapterGetSessionAndUser = async (
  token: string,
): Promise<{ session: AdapterSession; user: AdapterUser } | null> => {
  const response = await axios({
    url: PUBLIC_API_ENDPOINT,
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
          query {
              getUserBySessionToken(token: "${token}") {
                session{
                  sessionToken,
                  expires,
                  userId
                },
                user {
                  id,
                  email,
                  emailVerified
                }
              }
          }
      `,
    },
  });

  throwAuthError('Get User By Session Token', response);
  const data = response.data.data.getUserBySessionToken;
  if (data) {
    const { session, user } = response.data.data.getUserBySessionToken;
    const adapterSession = convertToAdapterSession(session);
    return { session: adapterSession, user };
  }

  return null;
};

export default adapterGetSessionAndUser;
