import type { IUser } from '$lib/types/user';
import type { AdapterUser } from '@auth/core/adapters';
import axios from 'axios';

export const adapterCreateUser = async (data: Omit<AdapterUser, 'id'>): Promise<AdapterUser> => {
  const response = await axios({
    url: 'http://localhost:3000/api/graphql',
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
          mutation {
              createUser(input: ${JSON.stringify(data)}) {
                id
                email,
                emailVerified
              }
          }
      `,
    },
  });
  const user: IUser = response.data.data.createUser;
  return { ...user };
};

export const adapterUpdateUser = async (data: Partial<AdapterUser>): Promise<AdapterUser> => {
  const response = await axios({
    url: 'http://localhost:3000/api/graphql',
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
          mutation {
              createUser(input: ${JSON.stringify(data)}) {
                id
                email,
                emailVerified
              }
          }
      `,
    },
  });
  const user: IUser = response.data.data.createUser;
  return { ...user };
};

export default adapterCreateUser;
