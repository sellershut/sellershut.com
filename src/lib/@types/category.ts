import type CallType from './api';

export type CategoryFetchKey = {
  callType: typeof CallType;
  max: number;
  parentId?: number;
  page: number;
  returnImages: boolean;
  returnParentId?: boolean;
};
export type Category = {
  id: number;
  name: string;
  parentId: number;
  imageUrl: string;
};

export type CategoriesResult = {
  categories: Category[];
  pages: number;
};
