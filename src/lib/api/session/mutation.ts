import type { AdapterSession } from '@auth/core/adapters';
import axios from 'axios';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export const apiCreateSession = async (session: {
  sessionToken: string;
  userId: string;
  expires: Date;
}): Promise<AdapterSession> => {
  const response = await axios.post(PUBLIC_API_ENDPOINT, {
    query: ` mutation createSession($sessionToken: String!, $userId: String, $expires: DateTime){
            createSession(input: {sessionToken: $sessionToken, userId: $userId, expires: $expires}){
                    sessionToken
                    userId
                    expires
            }
        }
        `,
    variables: session,
  });

  return response.data.data.createSession;
};
export const apiUpdateSession = async (
  session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>,
): Promise<AdapterSession | null | undefined> => {
  const response = await axios.post(PUBLIC_API_ENDPOINT, {
    query: ` mutation updateSession($sessionToken: String!, $userId: String, $expired: DateTime){
            updateSession(sessionToken: $sessionToken, userId: $userId, expires: $expires){
                    sessionToken
                    userId
                    expires
            }
        }
        `,
    variables: session,
  });

  return response.data.data.updateSession;
};

export const apiDeleteSession = async (
  sessionToken: string,
): Promise<AdapterSession | null | undefined> => {
  await axios.post(PUBLIC_API_ENDPOINT, {
    query: ` mutation deleteSession($sessionToken: String!){
            deleteSession(sessionToken: $sessionToken){
                rowsAffected
            }
        }
        `,
    variables: {
      sessionToken,
    },
  });
  return null;
};

export default apiCreateSession;
