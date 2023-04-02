import type { AdapterAccount, AdapterUser } from '@auth/core/adapters';
import axios from 'axios';

export const adapterGetUserByAccount = async (
  providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>,
): Promise<AdapterUser | null> => {
  const response = await axios({
    url: 'http://localhost:3000/api/graphql',
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
            query{
              getUserByAccountId(${JSON.stringify(providerAccountId)}){
                id,
                email,
                emailVerified,
              }
            }
      `,
    },
  });
  return response.data.data.getUserByAccountId;
};

export default adapterGetUserByAccount;
