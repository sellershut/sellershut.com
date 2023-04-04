import type { ISession } from '$lib/types/session';
import type { AdapterSession } from '@auth/core/adapters';
import axios from 'axios';
import { throwAuthError } from '$lib/shared/throw-auth-error';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export const convertToAdapterSession = (response: {
  sessionToken: string;
  userId: string;
  expires: string;
}): AdapterSession => {
  const { sessionToken, userId, expires } = response;
  return {
    sessionToken,
    userId,
    expires: new Date(expires),
  };
};

export const adapterCreateSession = async (
  session: Omit<ISession, 'id'>,
): Promise<AdapterSession> => {
  const { expires, userId, sessionToken } = session;
  const response = await axios({
    url: PUBLIC_API_ENDPOINT,
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
          mutation {
              createSession(input: {
                  expires: "${expires.toISOString()}",
                  userId: "${userId}",
                  sessionToken: "${sessionToken}",
              }) {
                sessionToken,
                userId,
                expires
              }
          }
      `,
    },
  });
  throwAuthError('Create Session', response);
  const data = response.data.data.createSession;

  return convertToAdapterSession(data);
};

export const adapterDeleteSession = async (sessionToken: string): Promise<AdapterSession> => {
  const response = await axios({
    url: PUBLIC_API_ENDPOINT,
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
          mutation {
              deleteSession(sessionToken: ${sessionToken}) {
                sessionToken,
                expires,
                userId
              }
          }
      `,
    },
  });

  throwAuthError('Delete Session', response);
  const data = response.data.data.deleteSession;
  return convertToAdapterSession(data);
};

export const adapterUpdateSession = async (
  session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>,
): Promise<AdapterSession | null | undefined> => {
  const response = await axios({
    url: PUBLIC_API_ENDPOINT,
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
          mutation {
              updateSession(${JSON.stringify(session)}) {
                sessionToken,
                expires,
                userId
              }
          }
      `,
    },
  });

  throwAuthError('Update Session', response);

  const data = response.data.data.updateSession;
  return convertToAdapterSession(data);
};

export default adapterCreateSession;
