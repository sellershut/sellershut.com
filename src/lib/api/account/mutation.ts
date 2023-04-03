import type { AdapterAccount } from '@auth/core/adapters';
import axios from 'axios';
import { apiStringify } from '$lib/shared/api-stringify';
import { throwAuthError } from '$lib/shared/throw-auth-error';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export const adapterCreateAccount = async (account: AdapterAccount) => {
  const processed = { ...account };
  processed.accessToken = processed.access_token;
  processed.expiresIn = processed.expires_in;
  processed.tokenType = processed.token_type;
  processed.refreshToken = processed.refresh_token;
  processed.idToken = processed.id_token;
  delete processed.access_token;
  delete processed.expires_in;
  delete processed.token_type;
  delete processed.refresh_token;
  delete processed.id_token;
  const params = apiStringify(processed);
  const response = await axios({
    url: PUBLIC_API_ENDPOINT,
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
          mutation {
              createAccount(input: ${params}) {
                userId
              }
          }
      `,
    },
  });
  throwAuthError('Create Account', response);
  return response.data.data.createAccount;
};

export default adapterCreateAccount;
