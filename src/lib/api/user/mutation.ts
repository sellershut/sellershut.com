import type { AdapterUser } from '@auth/core/adapters';
import axios from 'axios';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export const apiUpdateUser = async (
  user: Partial<AdapterUser>,
): Promise<AdapterUser> => {
  const data = await axios.post(
    PUBLIC_API_ENDPOINT,
    {
      query: `mutation updateUser($email: String, $name: String, $image: String, $emailVerified: DateTime) {
                updateUser(input:{ email: $email, name: $name, image: $image, emailVerified: $emailVerified}){
                    id
                    name
                    image
                    emailVerified
                    email
                }
            }`,
      variables: user,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return data.data.data.updateUser;
};

export const apiCreateUser = async (
  user: Omit<AdapterUser, 'id'>,
): Promise<AdapterUser> => {
  const data = await axios.post(
    PUBLIC_API_ENDPOINT,
    {
      query: `mutation createUser($email: String, $name: String, $image: String, $emailVerified: DateTime) {
                createUser(input:{ email: $email, name: $name, image: $image, emailVerified: $emailVerified}){
                    id
                    name
                    image
                    emailVerified
                    email
                }
            }`,
      variables: user,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return data.data.data.createUser;
};

export default apiCreateUser;
