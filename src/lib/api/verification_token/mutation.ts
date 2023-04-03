import type { VerificationToken } from '@auth/core/adapters';
import axios from 'axios';
import { throwAuthError } from '$lib/shared/throw-auth-error';
import { apiStringify } from '$lib/shared/api-stringify';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export const adapterCreateVerificationToken = async (
  data: VerificationToken,
): Promise<VerificationToken> => {
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
              createVerificationToken(input: ${params}){
                identifier,
                token,
                expires
              }
          }
      `,
    },
  });

  throwAuthError('Create Verification Token', response);
  return response.data.data.createVerificationToken;
};

export const adapterDeleteVerificationToken = async (
  identifier: string,
  token: string,
): Promise<VerificationToken> => {
  const response = await axios({
    url: PUBLIC_API_ENDPOINT,
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
          mutation {
              deleteVerificationToken(identifier: "${identifier}", token: "${token}") {
                identifier,
                token,
                expires
              }
          }
      `,
    },
  });
  throwAuthError('Delete Verification Token', response);
  return response.data.data.deleteVerificationToken;
};

export default adapterCreateVerificationToken;
