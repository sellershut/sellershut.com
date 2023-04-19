import type { SvelteComponent } from 'svelte';
import { modalContent, showModal } from './modal-store';

export const toggleModal = (component: typeof SvelteComponent) => {
  modalContent.set(component);
  showModal.update((val) => !val);
};

export default toggleModal;
