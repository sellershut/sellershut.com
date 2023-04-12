import axios from 'axios';
import type { AdapterSession, AdapterUser } from '@auth/core/adapters';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export const apiGetSessionAndUser = async (
  sessionToken: string,
): Promise<{ session: AdapterSession; user: AdapterUser } | null> => {
  const response = await axios.post(PUBLIC_API_ENDPOINT, {
    query: ` query getUserAndSession($sessionToken: String!){
            getUserAndSession(sessionToken: $sessionToken){
                session {
                    sessionToken
                    userId
                    expires
                },
                user {
                    id
                    name
                    email
                    image
                    emailVerified
                }
            }
        }
        `,
    variables: {
      sessionToken,
    },
  });

  const { user, session } = response.data.data.getUserAndSession;

  return { user, session };
};

export default apiGetSessionAndUser;
