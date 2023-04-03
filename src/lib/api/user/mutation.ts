import type { AdapterUser } from '@auth/core/adapters';
import axios from 'axios';
import { apiStringify } from '$lib/shared/api-stringify';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export const adapterCreateUser = async (data: Omit<AdapterUser, 'id'>): Promise<AdapterUser> => {
  const obj = {
    ...data,
  };
  const params = apiStringify(obj);

  const response = await axios({
    url: PUBLIC_API_ENDPOINT,
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
          mutation {
              createUser(input: ${params}) {
                id,
                email,
                emailVerified
              }
          }
      `,
    },
  });
  return response.data.data.createUser;
};

export const adapterUpdateUser = async (data: Partial<AdapterUser>): Promise<AdapterUser> => {
  const response = await axios({
    url: PUBLIC_API_ENDPOINT,
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
          mutation {
              createUser(input: ${JSON.stringify(data)}) {
                id,
                email,
                emailVerified
              }
          }
      `,
    },
  });
  return response.data.data.createUser;
};

export default adapterCreateUser;
