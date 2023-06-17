import type { ModalStatus } from '$lib/util/stores/modal';
import AdLocation from '$lib/components/modal/create-ad/ad-info/ad-location.svelte';
import { adLocationTitle } from './ad-location-title';

export const adLocation: Pick<ModalStatus, 'content' | 'title'> = {
  content: AdLocation,
  title: adLocationTitle,
};

export default adLocation;
