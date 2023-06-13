import AdInfo from '$lib/components/modal/create-ad/ad-info.svelte';
import type { ModalStatus } from '../../stores/modal';

export const adInfo: Pick<ModalStatus, 'content' | 'title'> = {
  content: AdInfo,
  title: {
    value: 'Details',
    subTitle: 'Tell us all you can about what you want to sell',
  },
};

export default adInfo;
