import type { AdapterUser } from '@auth/core/adapters';
import axios from 'axios';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export const apiGetUser = async (id: string): Promise<AdapterUser | null> => {
  const data = await axios.post(
    PUBLIC_API_ENDPOINT,
    {
      query: `query getUser($id: String) {
                getUser(id: $id){
                    id
                    name
                    image
                    emailVerified
                    email
                }
            }`,
      variables: {
        id,
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return data.data.data.getUser;
};

export const apiGetUserByEmail = async (
  email: string,
): Promise<AdapterUser | null> => {
  const data = await axios.post(
    PUBLIC_API_ENDPOINT,
    {
      query: `query getUserByEmail($email: String) {
                getUserByEmail(email: $email){
                    id
                    name
                    image
                    emailVerified
                    email
                }
            }`,
      variables: {
        email,
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return data.data.data.getUserByEmail;
};

export default apiGetUser;
