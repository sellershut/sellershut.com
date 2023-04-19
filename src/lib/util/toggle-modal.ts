import type { SvelteComponent } from 'svelte';
import { modalContent, showModal } from './stores/modal';

export const toggleModal = (component: typeof SvelteComponent) => {
  modalContent.set(component);
  showModal.update((val) => !val);
};

export const hideModal = () => {
  modalContent.set(undefined);
  showModal.set(false);
};

export default toggleModal;
