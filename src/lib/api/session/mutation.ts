import type { AdapterSession } from '@auth/core/adapters';
import axios from 'axios';
import type { ApiSession } from '$lib/@types/auth/session';
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

  const { createSession }: { createSession: ApiSession } = response.data.data;
  return {
    sessionToken: createSession.sessionToken,
    userId: createSession.userId,
    expires: new Date(createSession.expires),
  };
};
export const apiUpdateSession = async (
  session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>,
): Promise<AdapterSession | null | undefined> => {
  const response = await axios.post(PUBLIC_API_ENDPOINT, {
    query: ` mutation updateSession($sessionToken: String!, $userId: String, $expires: DateTime){
            updateSession(sessionToken: $sessionToken, userId: $userId, expires: $expires){
                    sessionToken
                    userId
                    expires
            }
        }
        `,
    variables: session,
  });

  const { updatedSession }: { updatedSession: ApiSession } =
    response.data.data.updateSession;
  return {
    sessionToken: updatedSession.sessionToken,
    userId: updatedSession.userId,
    expires: new Date(updatedSession.expires),
  };
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
