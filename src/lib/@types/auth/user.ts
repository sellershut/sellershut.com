export type ApiUser = {
  id: string;
  name?: string;
  email?: string;
  emailVerified?: string;
  image?: string;
  savedAds?: string[];
  watchedCategories?: number[];
};
