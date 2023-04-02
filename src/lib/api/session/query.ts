import type { AdapterSession, AdapterUser } from '@auth/core/adapters';
import axios from 'axios';

export const adapterGetSessionAndUser = async (
  token: string,
): Promise<{ session: AdapterSession; user: AdapterUser } | null> => {
  const response = await axios({
    url: 'http://localhost:3000/api/graphql',
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
          query {
              getUserBySessionToken(token: ${token}) {
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
  const { session, user } = response.data.data.getUserBySessionToken;
  return { session, user };
};

export default adapterGetSessionAndUser;
