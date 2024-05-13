import { closeModal } from './icons.js'


export const deleteClientModal = () => {
    const deleteModalContent = document.createElement('div');
    const modalClose = document.createElement('button');
    const deleteModalTitle = document.createElement('h2');
    const deleteModalText = document.createElement('p');
    const deleteModal = document.createElement('div');
    const deleteModalDelete = document.createElement('button');
    const deleteModalBack = document.createElement('button');

    deleteModal.classList.add('delete-modal',);
    deleteModalContent.classList.add('delete-modal__content');
    deleteModalText.classList.add('delete-modal__text');
    deleteModalTitle.classList.add('delete-modal__title',);
    deleteModalDelete.classList.add('delete-modal__delete');
    deleteModalBack.classList.add('delete-modal__back');
    modalClose.classList.add('modal__close',);

    modalClose.innerHTML = closeModal;



    deleteModalTitle.textContent = 'Удалить клиента';
    deleteModalText.textContent = 'Вы действительно хотите удалить данного клиента?';
    deleteModalDelete.textContent = 'Удалить';
    deleteModalBack.textContent = 'Отмена';

    deleteModalContent.append(
        modalClose,
        deleteModalTitle,
        deleteModalText,
        deleteModalDelete,
        deleteModalBack
    )
    deleteModal.append(deleteModalContent);

    window.addEventListener('click', (e) => {
        if (e.target === deleteModal) {
            deleteModal.remove();
        }
    });

    modalClose.addEventListener('click', () => {
      deleteModal.remove();
    })

    deleteModalBack.addEventListener('click', () => {
      deleteModal.remove();
    })

    return {
        deleteModal,
        deleteModalContent,
        deleteModalDelete
    }
}
