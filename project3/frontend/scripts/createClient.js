import { getClients } from "./server.js";
import { svgVK, svgFB, svgPhone, svgMail } from "./icons.js";
import { deleteClientModal } from "./confirmDelete.js";
import { editClientModal } from './edit.js'
import { contactTooltip } from "./tooltip.js";
import { createPreloader } from './preloader.js'


const createContactLink = (type, value, element, svg, item) => {
  const setTooltip = contactTooltip(type, value);
  element = document.createElement('a');
  element.classList.add('contacts__link');
  element.innerHTML = svg;

  if (type === 'Email') {
      element.href = `mailto:${value.trim()}`
  } else if (type === 'Телефон') {
      element.href = `tel:${value.trim()}`
  } else {
      element.href = value.trim();
  }
  element.prepend(setTooltip.tooltip);
  item.append(element);
}

const createContactItemByType = (type, value, item) => {
  switch (type) {
      case 'Телефон':
          let phone;
          createContactLink(type, value, phone, svgPhone, item);
          break;
      case 'Facebook':
          let fb;
          createContactLink(type, value, fb, svgFB, item);
          break;
      case 'VK':
          let vk;
          createContactLink(type, value, vk, svgVK, item);
          break;
      case 'Email':
          let email;
          createContactLink(type, value, email, svgMail, item);
          break;
      case 'Email':
          let other;
          createContactLink(type, value, other, svgOther, item);
          break;

      default:
          break;
  }
}

const formatDate = data => {
  const newDate = new Date(data);

  const correctDate ={
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }

  const resultDate = newDate.toLocaleString('ru', correctDate);
  return resultDate;
}

const formatTime = data => {
  const newDate = new Date(data);

  const correctTime={
    hour: 'numeric',
    minute: 'numeric'
  }

  const resultTime = newDate.toLocaleString('ru', correctTime);
  return resultTime;
}


const sortTableById = () => {
  const tableBody = document.querySelector('.clients-table__body');
  const tableRows = Array.from(tableBody.querySelectorAll('.clients__item'));
  const idHeader = document.getElementById('table-id');

  let ascendingOrder = true; // Переменная для отслеживания направления сортировки

  idHeader.addEventListener('click', () => {
    // Сортировка таблицы по ID
    const svgIcon = idHeader.querySelector('svg');
    svgIcon.classList.toggle('flipped')
    tableRows.sort((rowA, rowB) => {
      const idA = rowA.querySelector('.client__id').textContent;
      const idB = rowB.querySelector('.client__id').textContent;

      if (idA < idB) {
        return ascendingOrder ? -1 : 1; // Изменение направления сортировки
      }
      if (idA > idB) {
        return ascendingOrder ? 1 : -1; // Изменение направления сортировки
      }
      return 0;
    });

    // Очистка таблицы
    tableRows.forEach((row) => {
      tableBody.removeChild(row);
    });

    // Добавление отсортированных строк в таблицу
    tableRows.forEach((row) => {
      tableBody.appendChild(row);
    });

    // Изменение направления сортировки для следующего нажатия
    ascendingOrder = !ascendingOrder;
  });
};


const sortTableByFullName = () => {
  const tableBody = document.querySelector('.clients-table__body');
  const tableRows = Array.from(tableBody.querySelectorAll('.clients__item'));
  const fullNameHeader = document.getElementById('table-fio')
  const fullNameIcon = fullNameHeader.querySelector('svg');

  let ascendingFullNameOrder = true; // Переменная для отслеживания направления сортировки

  fullNameHeader.addEventListener('click', () => {
    // Сортировка таблицы по ФИО
    fullNameIcon.classList.toggle('flipped');
    tableRows.sort((rowA, rowB) => {
      const fullNameA = rowA.querySelector('.clients__full-name').textContent.toLowerCase();
      const fullNameB = rowB.querySelector('.clients__full-name').textContent.toLowerCase();

      if (fullNameA < fullNameB) {
        return ascendingFullNameOrder ? -1 : 1; // Изменение направления сортировки
      }
      if (fullNameA > fullNameB) {
        return ascendingFullNameOrder ? 1 : -1; // Изменение направления сортировки
      }
      return 0;
    });

    // Очистка таблицы
    tableRows.forEach((row) => {
      tableBody.removeChild(row);
    });

    // Добавление отсортированных строк в таблицу
    tableRows.forEach((row) => {
      tableBody.appendChild(row);
    });

    // Изменение направления сортировки для следующего нажатия
    ascendingFullNameOrder = !ascendingFullNameOrder;
  });
};

let descendingCreatedAtOrder = true;

const sortTableByCreatedAt = () => {
  const tableBody = document.querySelector('.clients-table__body');
  const tableRows = Array.from(tableBody.querySelectorAll('.clients__item'));
  const createdAtHeader = document.getElementById('table__created-time');
  const createdAtIcon = createdAtHeader.querySelector('svg');

  createdAtHeader.addEventListener('click', () => {
    // Сортировка таблицы по дате и времени создания
    createdAtIcon.classList.toggle('flipped');
    tableRows.sort((rowA, rowB) => {
      const datePartA = rowA.querySelector('.created__date').textContent.trim();
      const timePartA = rowA.querySelector('.created__time').textContent;
      const dateTimeStringA = datePartA + timePartA;

      const [dayA, monthA, yearA] = datePartA.split(".");
      const [hourA, minuteA] = timePartA.split(":");

      const createdAtA = new Date(Number(yearA), Number(monthA) - 1, Number(dayA), Number(hourA), Number(minuteA));

      const datePartB = rowB.querySelector('.created__date').textContent.trim();
      const timePartB = rowB.querySelector('.created__time').textContent;
      const dateTimeStringB = datePartB + timePartB;

      const [dayB, monthB, yearB] = datePartB.split(".");
      const [hourB, minuteB] = timePartB.split(":");

      const createdAtB = new Date(Number(yearB), Number(monthB) - 1, Number(dayB), Number(hourB), Number(minuteB));

      if (createdAtA < createdAtB) {
        return descendingCreatedAtOrder ? 1 : -1;
      }
      if (createdAtA > createdAtB) {
        return descendingCreatedAtOrder ? -1 : 1;
      }
      return 0;
    });

    // Очистка таблицы
    tableRows.forEach((row) => {
      tableBody.removeChild(row);
    });

    // Добавление отсортированных строк в таблицу
    tableRows.forEach((row) => {
      tableBody.appendChild(row);
    });

    // Изменение направления сортировки для следующего нажатия
    descendingCreatedAtOrder = !descendingCreatedAtOrder;
  });
};


const sortTableByUpdatedAt = () => {
  const tableBody = document.querySelector('.clients-table__body');
  const tableRows = Array.from(tableBody.querySelectorAll('.clients__item'));
  const updatedAtHeader = document.getElementById('table__changed-time');
  const updatedAtIcon = updatedAtHeader.querySelector('svg');

  let descendingUpdatedAtOrder = true; // Переменная для отслеживания направления сортировки

  updatedAtHeader.addEventListener('click', () => {
    // Сортировка таблицы по дате и времени изменения
    updatedAtIcon.classList.toggle('flipped');
    tableRows.sort((rowA, rowB) => {
      const datePartA = rowA.querySelector('.changed__date').textContent.trim();
      const timePartA = rowA.querySelector('.changed__time').textContent;
      const dateTimeStringA = datePartA + timePartA;

      const [dayA, monthA, yearA] = datePartA.split(".");
      const [hourA, minuteA] = timePartA.split(":");

      const updatedAtA = new Date(Number(yearA), Number(monthA) - 1, Number(dayA), Number(hourA), Number(minuteA));

      const datePartB = rowB.querySelector('.changed__date').textContent.trim();
      const timePartB = rowB.querySelector('.changed__time').textContent;
      const dateTimeStringB = datePartB + timePartB;

      const [dayB, monthB, yearB] = datePartB.split(".");
      const [hourB, minuteB] = timePartB.split(":");

      const updatedAtB = new Date(Number(yearB), Number(monthB) - 1, Number(dayB), Number(hourB), Number(minuteB));

      if (updatedAtA < updatedAtB) {
        return descendingUpdatedAtOrder ? 1 : -1;
      }
      if (updatedAtA > updatedAtB) {
        return descendingUpdatedAtOrder ? -1 : 1;
      }
      return 0;
    });

    // Очистка таблицы
    tableRows.forEach((row) => {
      tableBody.removeChild(row);
    });

    // Добавление отсортированных строк в таблицу
    tableRows.forEach((row) => {
      tableBody.appendChild(row);
    });

    // Изменение направления сортировки для следующего нажатия
    descendingUpdatedAtOrder = !descendingUpdatedAtOrder;
  });
};




const createClientItem = (data) => {
  const clientTr = document.createElement('tr');
  const clientId = document.createElement('span');
  const clientFullName = document.createElement('td');
  const clientName = document.createElement('span');
  const clientSurname = document.createElement('span');
  const clientLastName = document.createElement('span');
  const clientCreated = document.createElement('td');
  const createDate = document.createElement('span');
  const createdTime = document.createElement('span');
  const clientChanged = document.createElement('td');
  const changedDate = document.createElement('span');
  const changedTime = document.createElement('span');
  const clientContacts = document.createElement('td');
  const clientActions = document.createElement('td');
  const clientEdit = document.createElement('button');
  const clientDelete = document.createElement('button');
  const deleteClient = deleteClientModal();
  const editClient = editClientModal(data)


  clientTr.classList.add('clients__item');
  clientTr.id = data.id;
  clientId.classList.add('clients__td', 'client__id');
  clientFullName.classList.add('clients__td', 'clients__full-name');
  clientName.classList.add('clients__name');
  clientSurname.classList.add('clients__surname');
  clientLastName.classList.add('clients__lastname');
  clientCreated.classList.add('clients__td', 'clients__created');
  createDate.classList.add('created__date');
  createdTime.classList.add('created__time');
  clientChanged.classList.add('clients__td', 'clients__changed');
  changedDate.classList.add('changed__date');
  changedTime.classList.add('changed__time');
  clientContacts.classList.add('clients__td', 'clients__contacts');
  clientActions.classList.add('clients__td', 'clients__actions');
  clientContacts.classList.add('clients__contacts');
  clientDelete.classList.add('btn-reset', 'clients__delete');
  clientEdit.classList.add( 'btn-reset', 'clients__edit');



  for(const contact of data.contacts) {
    createContactItemByType(contact.type, contact.value, clientContacts)
  }

  const deleteById = () => {
    import('./server.js').then(({deleteClientItem}) => {
      deleteClient.deleteModalDelete.addEventListener('click', () => {
        deleteClientItem(data.id)
        document.getElementById(data.id).remove();
        deleteClient.deleteModal.remove();
      })
    })
  }

  clientDelete.addEventListener('click', () => {
    deleteById();
    document.body.append(deleteClient.deleteModal)
  })

  clientEdit.addEventListener('click', () => {
    document.body.append(editClient.editModal)
  })



  clientId.textContent = data.id.substr(0, 6);
  clientName.textContent = data.name;
  clientSurname.textContent = data.surname;
  clientLastName.textContent = data.lastName;
  clientEdit.textContent = 'Изменить';
  clientDelete.textContent = 'Удалить';
  createDate.textContent = formatDate(data.createdAt) + ' '
  createdTime.textContent = formatTime(data.createdAt)
  changedDate.textContent = formatDate(data.updatedAt) + ' '
  changedTime.textContent = formatTime(data.updatedAt)

  clientFullName.append(clientSurname.textContent + ' ' + clientName.textContent + ' ' + clientLastName.textContent);
  clientCreated.append(createDate, createdTime);
  clientChanged.append(changedDate, changedTime);


  clientActions.append(clientEdit, clientDelete);
  clientTr.append(
      clientId,
      clientFullName,
      clientCreated,
      clientChanged,
      clientContacts,
      clientActions
  );
  return clientTr;
}





const createTable = async () => {
  const table = document.querySelector('.clients-table');
  const tBody = document.createElement('tbody');
  tBody.classList.add('clients-table__body');
  table.append(tBody);
  tBody.append(createPreloader());

  const searchInput = document.getElementById('search-input');
  let timeoutId; // Идентификатор таймера

  const handleSearch = () => {
    console.log('123')
    clearTimeout(timeoutId); // Сброс предыдущего таймера

    timeoutId = setTimeout(() => {
      const query = searchInput.value.trim().toLowerCase();
      const tableBody = document.querySelector('.clients-table__body');
      const tableRows = Array.from(tableBody.querySelectorAll('.clients__item'));

      // Фильтрация строк таблицы по запросу
      tableRows.forEach((row) => {
        const fullName = row.querySelector('.clients__full-name').textContent.toLowerCase();
        const clientId = row.querySelector('.client__id').textContent.toLowerCase();
        const createdAt = row.querySelector('.created__date').textContent.toLowerCase();

        if (
          fullName.includes(query) ||
          clientId.includes(query) ||
          createdAt.includes(query)
        ) {
          row.style.display = ''; // Отображение строк, удовлетворяющих запросу
        } else {
          row.style.display = 'none'; // Скрытие строк, не соответствующих запросу
        }
      });
    }, 300);
  };

  searchInput.addEventListener('input', handleSearch);


  try {
    const clients = await getClients();

    // Удаление прелоадера
    const preloader = document.querySelector('.preloader');
    preloader.remove();

    // Добавление контактов
    for (const client of clients) {
      document.querySelector('.clients-table__body').append(createClientItem(client));
    }

    // Сортировка таблицы по дате и времени изменения
    sortTableByUpdatedAt();
    // Сортировка таблицы по дате и времени создания
    sortTableByCreatedAt()
    // Сортировка таблицы по ID
    sortTableById();
    // Сортировка таблицы по ФИО
    sortTableByFullName();

  } catch (error) {
    console.log('Ошибка при загрузке клиентов', error);
  }
}

createTable();






















