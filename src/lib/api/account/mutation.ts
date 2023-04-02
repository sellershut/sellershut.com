import type { AdapterAccount } from '@auth/core/adapters';
import axios from 'axios';

export const adapterCreateAccount = async (account: AdapterAccount) => {
  const response = await axios({
    url: 'http://localhost:3000/api/graphql',
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
          mutation {
              createAccount(input: ${JSON.stringify(account)}) {
                userId
              }
          }
      `,
    },
  });
  const dbSession = response.data.data.createAccount;
  return { ...dbSession };
};

export default adapterCreateAccount;
