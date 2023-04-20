// import { hideModal } from './toggle-modal';
import type { Session } from '@auth/core/types';
import { signIn } from '@auth/sveltekit/client';
import { navAvatarDropdownVisible } from './stores/nav-avatar-dropdown';
import { showModal, modalContent } from './stores/modal';
import ModalCreateAd from '../components/modals/modal-create-ad.svelte';

export const handleCreateAd = (session: Session | null): void => {
  if (session) {
    modalContent.set(ModalCreateAd);
    showModal.set(true);
    navAvatarDropdownVisible.set(false);
  } else {
    signIn();
  }
};

export default handleCreateAd;
