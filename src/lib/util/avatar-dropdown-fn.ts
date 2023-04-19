// import { hideModal } from './toggle-modal';
import { navAvatarDropdownVisible } from './stores/nav-avatar-dropdown';
import { showModal, modalContent } from './stores/modal';
import ModalCreateAd from '../components/modals/modal-create-ad.svelte';

export const handleCreateAd = (): void => {
  modalContent.set(ModalCreateAd);
  showModal.set(true);

  navAvatarDropdownVisible.set(false);
};

export default handleCreateAd;
