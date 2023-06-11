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

export const keyRootCategories: CategoryFetchKey = {
  callType: 'categories',
  max: 20, // kind of hacky, but I dont think it's worth making another fetch here
  parentId: 0,
  page: 1,
  returnImages: false,
};

export const findCategories = async (
  maxPerPage: number,
  parentId = 0,
  page = 1,
  returnImages = false,
  returnParentId = false,
): Promise<CategoriesResult> => {
  const response = await axios.post(PUBLIC_API_ENDPOINT, {
    query: ` query getCategories($parentId: Int!, $page: Int!, $maxPerPage: Int!){
      getCategories(page: $page, maxPerPage: $maxPerPage, parentId: $parentId){
        categories {
          id,
          name,
          ${returnImages ? 'imageUrl,' : ''}
          ${returnParentId ? 'parentId,' : ''}
        },
        pages
      }
   }
   `,
    variables: {
      parentId,
      maxPerPage,
      page,
    },
  });

  return response.data.data.getCategories;
};

export default findCategories;
