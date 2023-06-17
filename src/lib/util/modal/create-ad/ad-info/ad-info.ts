import AdInfo from '$lib/components/modal/create-ad/ad-info.svelte';
import type { ModalStatus } from '$lib/util/stores/modal';
import { adInfoTitle } from './ad-info-title';

export const adInfo: Pick<ModalStatus, 'content' | 'title'> = {
  content: AdInfo,
  title: adInfoTitle,
};

export default adInfo;
