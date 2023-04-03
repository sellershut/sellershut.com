import axios from 'axios';
import type { ICategory } from '$lib/types/category';
import { throwAuthError } from '$lib/shared/throw-auth-error';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export const keyRootCategories = 'rootCategories';

export const getSubCategories = async (id = 0): Promise<ICategory[]> => {
  const response = await axios({
    url: PUBLIC_API_ENDPOINT,
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
          query {
              getSubCategories(parentId: ${id}) {
                id,
                name,
                parentId,
                imageUrl,
              }
          }
      `,
    },
  });

  throwAuthError('Get SubCategories', response);
  return response.data.data.getSubCategories;
};

export default getSubCategories;
