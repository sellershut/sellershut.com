import axios from 'axios';
import type { IUser } from '$lib/types/user';
import type { AdapterUser } from '@auth/core/adapters';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export const getUserById = async (
  id: string,
  type: 'email' | 'id',
): Promise<AdapterUser | null> => {
  const response = await axios({
    url: PUBLIC_API_ENDPOINT,
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
          query {
              getUserBy${type === 'email' ? 'Email' : 'Id'}(${
  type === 'email' ? 'email' : 'id'
}: "${id}") {
                id,
                email,
                emailVerified
              }
          }
      `,
    },
  });

  if (type === 'email') {
    return response.data.data.getUserByEmail;
  }
  return response.data.data.getUserById;
};

export const getUserByAccountId = async (
  providerAccountId: string,
  provider: string,
): Promise<IUser> => {
  const response = await axios({
    url: PUBLIC_API_ENDPOINT,
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
          query {
              getUserByProvider(id: ${providerAccountId}, name: ${provider}) {
                id,
                name,
              }
          }
      `,
    },
  });
  return response.data.data.getUser;
};

export default getUserById;
