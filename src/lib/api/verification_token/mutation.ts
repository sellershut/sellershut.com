import type { VerificationToken } from '@auth/core/adapters';
import axios from 'axios';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export const adapterCreateVerificationToken = async (
  data: VerificationToken,
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
              createVerificationToken(input: ${JSON.stringify(data)}){
                identifier,
                token,
                expires
              }
          }
      `,
    },
  });
  const verificationToken: VerificationToken = response.data.data.createVerificationToken;
  return { ...verificationToken };
};

export const adapterDeleteVerificationToken = async (
  identifierToken: string,
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
              deleteVerificationToken(id: ${identifierToken}) {
                identifier,
                token,
                expires
              }
          }
      `,
    },
  });
  return response.data.data.deleteVerificationToken;
};

export default adapterCreateVerificationToken;
