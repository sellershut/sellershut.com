import type { AdapterAccount, AdapterUser } from '@auth/core/adapters';
import axios from 'axios';
import { throwAuthError } from '$lib/shared/throw-auth-error';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export const adapterGetUserByAccount = async (
  data: Pick<AdapterAccount, 'provider' | 'providerAccountId'>,
): Promise<AdapterUser | null> => {
  const { provider, providerAccountId } = data;
  const response = await axios({
    url: PUBLIC_API_ENDPOINT,
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
            query{
              getUserByAccountId(
                  provider: "${provider}",
                  providerAccountId: "${providerAccountId}",
              ){
                id,
                email,
                emailVerified
              }
            }
      `,
    },
  });

  throwAuthError('Get User By Account', response);
  return response.data.data.getUserByAccountId;
};

export default adapterGetUserByAccount;
