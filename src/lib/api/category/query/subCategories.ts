import axios from 'axios';
import type { ICategory } from '$lib/types/category';

const getSubCategories = async (id = 0): Promise<ICategory[]> => {
  const response = await axios({
    url: 'http://localhost:3000/api/graphql',
    method: 'post',
    headers: {
      Authorization: 'Bearer foo',
    },
    data: {
      query: `
          query {
              getCategories {
                id,
                name,
                parentId,
                imageUrl,
              }
          }
      `,
    },
  });
  return response.data.data.getSubCategories;
};

export default getSubCategories;
