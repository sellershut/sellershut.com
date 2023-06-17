import AdPrice from '$lib/components/modal/create-ad/ad-info/ad-price.svelte';
import type { ModalStatus } from '../../stores/modal';

export const adPrice: Pick<ModalStatus, 'content' | 'title'> = {
  content: AdPrice,
  title: {
    value: 'Price',
    subTitle: 'How much is this going for?',
  },
};

export default adPrice;
