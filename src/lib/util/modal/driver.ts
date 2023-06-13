import { modal, type ModalStatus } from '../stores/modal';

export const showModal = (
  modalStatus: Pick<ModalStatus, 'title' | 'content'>,
) => {
  modal.set({
    isVisible: true,
    title: modalStatus.title,
    content: modalStatus.content,
  });
};

export default showModal;
