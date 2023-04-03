import type { ISession } from '$lib/types/session';
import type { AdapterSession } from '@auth/core/adapters';
import axios from 'axios';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export const adapterCreateSession = async (
  session: Omit<ISession, 'id'>,
): Promise<AdapterSession> => {
  const response = await axios({
    url: PUBLIC_API_ENDPOINT,
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
          mutation {
              createSession(input: ${JSON.stringify(session)}) {
                sessionToken,
                userId,
                expires
              }
          }
      `,
    },
  });
  const dbSession: ISession = response.data.data.createSession;
  return { ...dbSession };
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
                id,
                expires,
                userId
              }
          }
      `,
    },
  });
  const dbSession: ISession = response.data.data.createSession;
  return { ...dbSession };
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
                id,
                sessionToken,
                expires,
                userId
              }
          }
      `,
    },
  });

  if (response.data.error) {
    return null;
  }

  const dbSession: ISession = response.data.data.updateSession;
  return { ...dbSession };
};

export default adapterCreateSession;
