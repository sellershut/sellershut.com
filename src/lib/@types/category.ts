import type CallType from './api';

export type CategoryFetchKey = {
  callType: typeof CallType;
  max: number;
  parentId?: number;
  page: number;
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
