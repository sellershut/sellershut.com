export type Category = {
  id: string;
  subCategories: string[];
  name: string;
  imageUrl?: string;
  parentId?: string;
};
