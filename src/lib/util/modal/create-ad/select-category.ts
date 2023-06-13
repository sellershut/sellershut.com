import SelectCategory from '$lib/components/modal/create-ad/select-category.svelte';
import type { ModalStatus } from '../../stores/modal';

export const selectCategory: Pick<ModalStatus, 'content' | 'title'> = {
  content: SelectCategory,
  title: {
    value: 'Select Category',
    subTitle: 'What best describes the item you want to sell?',
  },
};

export default selectCategory;
