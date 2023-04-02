import axios from 'axios';
import type { IUser } from '$lib/types/user';
import type { AdapterUser } from '@auth/core/adapters';

export const getUserById = async (
  id: string,
  type: 'email' | 'id',
): Promise<AdapterUser | null> => {
  const response = await axios({
    url: 'http://localhost:3000/api/graphql',
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
          query {
              getUserBy${type === 'email' ? 'Email' : 'Id'}(id: ${id}) {
                id,
                email,
                emailVerified
              }
          }
      `,
    },
  });
  if (response.data.error) {
    return null;
  }

  const user: IUser = response.data.data.getUserById;
  return { ...user };
};

export const getUserByAccountId = async (
  providerAccountId: string,
  provider: string,
): Promise<IUser> => {
  const response = await axios({
    url: 'http://localhost:3000/api/graphql',
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
