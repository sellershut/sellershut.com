import type { AdapterUser } from '@auth/core/adapters';
import axios from 'axios';
import { apiStringify } from '$lib/shared/api-stringify';
import { throwAuthError } from '$lib/shared/throw-auth-error';
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
                emailVerified,
                image,
                name
              }
          }
      `,
    },
  });
  throwAuthError('Create User', response);
  return response.data.data.createUser;
};

export const adapterUpdateUser = async (data: Partial<AdapterUser>): Promise<AdapterUser> => {
  const params = apiStringify(data);
  const response = await axios({
    url: PUBLIC_API_ENDPOINT,
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
          mutation {
              updateUser(input: ${params}) {
                id,
                email,
                emailVerified,
                name,
                image,
              }
          }
      `,
    },
  });
  throwAuthError('Update User', response);
  return response.data.data.updateUser;
};

export const adapterDeleteUser = async (id: string) => {
  const response = await axios({
    url: PUBLIC_API_ENDPOINT,
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
          mutation {
              deleteUser(id: "${id}") {
                success,
              }
          }
      `,
    },
  });
  throwAuthError('Delete User', response);
  return response.data.data.deleteUser;
};

export default adapterCreateUser;
