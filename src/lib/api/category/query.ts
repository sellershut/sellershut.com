import axios from 'axios';
import type { CategoriesResult, CategoryFetchKey } from '$lib/@types/category';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export const keyNavigationCategories: CategoryFetchKey = {
  callType: 'categories',
  max: 5,
  parentId: 0,
  page: 1,
  returnImages: false,
};

export const keyFeaturedCategories: CategoryFetchKey = {
  callType: 'categories',
  max: 7,
  parentId: 0,
  page: 1,
  returnImages: true,
};

export const findCategories = async (
  maxPerPage: number,
  parentId = 0,
  page = 1,
  returnImages = false,
): Promise<CategoriesResult> => {
  const response = await axios({
    url: PUBLIC_API_ENDPOINT,
    method: 'post',
    data: {
      query: `
            query {
                findCategoriesInPage(page: ${page}, maxPerPage: ${maxPerPage}, parentId: ${parentId}){
                    categories {
                        name,
                        ${returnImages ? 'imageUrl,' : ''}
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
