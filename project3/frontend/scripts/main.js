import { createModalForm } from './createModal.js';

import { sendClientData } from './server.js';




export const addClient = () => {
  const createForm = createModalForm();
  const modal = document.createElement('div');
  const modalContent = document.createElement('div');

  modal.id = 'new-client-modal-cont';
  modal.className = 'new-client-modal-cont';
  modalContent.className = 'new-client modal';

  modal.classList.add('new-client-modal-cont-opened')

  modal.append(modalContent);
  modalContent.append(createForm.closeButton, createForm.title, createForm.form);

  createForm.closeButton.addEventListener('click', () => {
    modal.remove()
  })

  const errorMessage = document.createTextNode('')

  createForm.form.appendChild(createForm.saveButton);
  createForm.form.appendChild(createForm.cancelButton);
  createForm.form.appendChild(errorMessage);

  createForm.inputSurname.required = true;
  createForm.inputName.required = true;


  createForm.form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const contactContainers = document.querySelectorAll('.new-contact__content');

    let contacts = [];
    let clientObject = {};

    clientObject.name = createForm.inputName.value;
    clientObject.surname = createForm.inputSurname.value;
    clientObject.lastName = createForm.inputLastName.value;

    contactContainers.forEach(function(contactContainer) {
      const contactType = contactContainer.querySelector('.js-choice');
      const contactValue = contactContainer.querySelector('.new-contact__input');

      // Добавляем выбранное значение в массив контактов
      contacts.push({
        type: contactType.value,
        value: contactValue.value
      });
    });

    clientObject.contacts = contacts;
    console.log(clientObject);

    await sendClientData(clientObject, 'POST');
  });
  return modal
}


const $openModalAdd = document.getElementById('add-button')

$openModalAdd.addEventListener('click', () => {
  document.body.append(addClient())
})
