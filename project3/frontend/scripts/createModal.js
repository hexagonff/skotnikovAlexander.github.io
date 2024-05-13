import { svgDeleteContact } from './icons.js';

import { addContactIcon } from './icons.js';


export const createContact = () => {
  // Создаем контейнер для содержимого контакта
  const contactContent = document.createElement('div');
  contactContent.id = 'new-contact__content';
  contactContent.className = 'new-contact__content';

  const select = document.createElement('select');
  select.className = 'js-choice'; // Добавляем класс js-choice
  const options = ['Телефон', 'Доп. телефон', 'Email', 'Vk', 'Facebook'];
  for (let i = 0; i < options.length; i++) {
    const option = document.createElement('option');
    option.value = options[i];
    option.textContent = options[i];
    select.appendChild(option);
  }

  // Создаем поле ввода контакта
  const contactInput = document.createElement('input');
  contactInput.placeholder = 'Введите данные контакта';
  contactInput.className = 'new-contact__input';

  // Создаем кнопку удаления контакта
  const deleteContactButton = document.createElement('button');
  deleteContactButton.className = 'new-contact__button contact__delete';
  const deleteContactIcon = document.createElement('span');
  deleteContactIcon.className = 'contact-tooltip tooltip';
  deleteContactIcon.textContent = 'Удалить контакт';

  deleteContactButton.appendChild(deleteContactIcon);
  deleteContactButton.innerHTML = svgDeleteContact;

  //тултип

  const deleteTooltip = document.createElement('span')
  deleteTooltip.classList.add('contact-tooltip', 'tooltip')
  deleteTooltip.textContent = 'Удалить\u00A0контакт'



  //расположение
  deleteContactButton.prepend(deleteTooltip)
  contactContent.appendChild(select);
  contactContent.appendChild(contactInput);
  contactContent.appendChild(deleteContactButton);

  deleteContactButton.addEventListener('click', () => {
    contactContent.remove();
  })




  return {
    contactContent,
    select,
    contactInput,
    deleteContactButton,
  }
}




export const createModalForm = () => {
  // Создаем внутренний контейнер
  const innerContainer = document.createElement('div');
  innerContainer.className = 'new-client modal';

  // Создаем кнопку закрытия
  const closeButton = document.createElement('button');
  closeButton.id = 'new-client__close';
  closeButton.className = 'new-client__close';
  const closeIcon = document.createElement('span');
  closeIcon.className = 'close-icon';
  closeIcon.textContent = '×';
  closeButton.appendChild(closeIcon);

  // Создаем заголовок
  const title = document.createElement('h2');
  title.className = 'new-client__title';
  title.textContent = 'Новый клиент';

  // Создаем форму
  const form = document.createElement('form');
  form.id = 'add-client-form';
  form.className = 'new-client__form new-client-form';

  // Создаем поля ввода
  const inputSurname = document.createElement('input');
  inputSurname.id = 'input-surname';
  inputSurname.type = 'text';
  inputSurname.placeholder = 'Фамилия*';
  inputSurname.className = 'new-client-form__input';

  const inputName = document.createElement('input');
  inputName.id = 'input-name';
  inputName.type = 'text';
  inputName.placeholder = 'Имя*';
  inputName.className = 'new-client-form__input';

  const inputLastName = document.createElement('input');
  inputLastName.id = 'input-lastName';
  inputLastName.type = 'text';
  inputLastName.placeholder = 'Отчество';
  inputLastName.className = 'new-client-form__input';

  // Создаем контейнер контактов
  const contactContainer = document.createElement('div');
  contactContainer.id = 'contact-container';
  contactContainer.className = 'new-contact new-client__contacts';


  // Создаем кнопку добавления контакта
  const addContactButton = document.createElement('button');
  addContactButton.id = 'add-contact';
  addContactButton.className = 'new-client-form__add-contact';
  addContactButton.type = 'button';
  addContactButton.innerHTML = addContactIcon;
  addContactButton.innerHTML += 'Добавить контакт';


  // Создаем элемент для отображения текста ошибки
  const errorMessage = document.createElement('div');
  errorMessage.className = 'error-message';


  // Создаем кнопки сохранения и отмены
  const saveButton = document.createElement('button');
  saveButton.className = 'new-client__save';
  saveButton.textContent = 'Сохранить';

  const cancelButton = document.createElement('button');
  cancelButton.className = 'new-client__cancel';
  cancelButton.type = 'button';
  cancelButton.textContent = 'Отмена';

  // Добавляем все элементы в нужную структуру
  innerContainer.appendChild(closeButton);
  innerContainer.appendChild(title);
  innerContainer.appendChild(form);
  form.appendChild(inputSurname);
  form.appendChild(inputName);
  form.appendChild(inputLastName);
  form.appendChild(contactContainer);
  contactContainer.appendChild(addContactButton);
  form.appendChild(saveButton);
  form.appendChild(cancelButton);
  form.appendChild(errorMessage);

  const validateForm = () => {
    if (inputSurname.value.trim() === '' || inputName.value.trim() === '') {
      errorMessage.textContent = 'Пожалуйста, заполните все обязательные поля.';
      return false;
    }
    errorMessage.textContent = ''; // Очищаем текст ошибки при успешной валидации
    return true;
  };

  saveButton.addEventListener('click', (e) => {
    if (!validateForm()) {
      e.preventDefault();
    }
  });

  addContactButton.addEventListener('click', (e) => {
    e.preventDefault();
    const contactItem = createContact();
    contactContainer.prepend(contactItem.contactContent)
    const $addClientBtn = document.querySelector('.clients__add-button');
    contactContainer.classList.add('contact-padding')

    const selectElements = document.querySelectorAll('.js-choice');

    // Инициализируем choices-js на каждом элементе select
    selectElements.forEach((element) => {
      const choices = new Choices(element, {
        searchEnabled: false,
      });
    });

    $addClientBtn.addEventListener('click', () => {
      document.body.append(addClient());
    });
  })



  return {
    closeButton,
    title,
    form,
    inputSurname,
    inputName,
    inputLastName,
    contactContainer,
    addContactButton,
    saveButton,
    cancelButton,
    innerContainer
  }
}










