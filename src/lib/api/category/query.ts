import axios from 'axios';
import type { CategoriesResult, CategoryFetchKey } from '$lib/@types/category';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export const keyNavigationCategories: CategoryFetchKey = {
  callType: 'categories',
  max: 5,
  parentId: 0,
  page: 1,
};

export const findCategories = async (
  maxPerPage: number,
  parentId = 0,
  page = 1,
): Promise<CategoriesResult> => {
  const response = await axios({
    url: PUBLIC_API_ENDPOINT,
    method: 'post',
    data: {
      query: `
            query {
                findCategoriesInPage(page: ${page}, maxPerPage: ${maxPerPage}, parentId: ${parentId}){
                    categories {
                        name
                    },
                    pages
                }
            }
            `,
    },
  });

  return response.data.data.findCategoriesInPage;
};

export default findCategories;
