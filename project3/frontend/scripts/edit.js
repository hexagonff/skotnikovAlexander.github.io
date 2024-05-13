import { createContact, createModalForm } from "./createModal.js";
import { deleteClientModal } from './confirmDelete.js';
import { sendClientData } from './server.js'

export const editClientModal = (data) => {
  const editModal = document.createElement('div');
  const editModalContent = document.createElement('div');
  editModal.classList.add('new-client-modal-cont', 'new-client-modal-cont-opened')
  editModalContent.classList.add('new-client', 'modal')
  const createForm = createModalForm();

  createForm.inputName.value = data.name;
  createForm.inputSurname.value = data.surname;
  createForm.inputLastName.value = data.lastName;

  for (const contact of data.contacts) {
    const createContactEdit = createContact();

    createContactEdit.select.value = contact.type;
    createContactEdit.contactInput.value = contact.value;

    createForm.contactContainer.prepend(createContactEdit.contactContent);

    // Инициализация choices-js для нового select-элемента
    const selectElement = createContactEdit.select;
    const choices = new Choices(selectElement, {
      searchEnabled: false,
    });
  }

  createForm.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const contactTypes = document.querySelectorAll('.js-choice')
    const contactValues = document.querySelectorAll('.new-contact__input')
    let contacts = [];
    let client = {};

    for(let i = 0; i < contactTypes.length; i++) {
      contacts.push({
        type: contactTypes[i].value,
        value: contactValues[i].value
      });
    }

    client.name = createForm.inputName.value;
    client.surname = createForm.inputSurname.value;
    client.lastName = createForm.inputLastName.value;
    client.contacts = contacts;

    console.log(client)

    sendClientData(client, 'PATCH', data.id)

    console.log(client)

  });


  const modalId = document.createElement('span')
  modalId.classList.add('modal__id')

  modalId.textContent = 'ID: ' + data.id.substr(0, 6);
  createForm.title.textContent = 'Изменить данные';
  createForm.cancelButton.textContent = 'Удалить клиента';

  createForm.title.append(modalId)
  editModalContent.append(createForm.closeButton, createForm.title, createForm.modalClose, createForm.modalTitle, createForm.form);
  editModal.append(editModalContent);

  createForm.closeButton.addEventListener('click', () => {
    editModal.remove();
  })

  createForm.cancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    const deleteModal = deleteClientModal();
    document.body.append(deleteModal.deleteModal)

    import('./server.js').then(({ deleteClientItem }) => {
      deleteModal.deleteModalDelete.addEventListener('click', () => {
        deleteClientItem(data.id);
        document.getElementById(data.id).remove()
        deleteModal.deleteModal.remove();
        editModal.remove();
      })
    })
  })

  return {
    editModal,
    editModalContent
  }
}
