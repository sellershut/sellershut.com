import type { ComponentType } from 'svelte';

export type Category = {
  id: string;
  subCategories: string[];
  name: string;
  imageUrl: string;
  parentId?: string;
};

export type SliderCategory = {
  id: string;
  text: string;
  icon?: ComponentType;
};
