/*
  Документация API: https://jsonplaceholder.typicode.com/

  Просмотр всех пользователей: https://jsonplaceholder.typicode.com/users/ 

  Написать функцию getUsers, которая по нажатию кнопки посылает get запрос.
  Результатом fetch будет массив объектов.
  
  В таблицу .user-table добавить строки для каждого пользователя.
  Каждая строка состоит из 3-х столбцов указанного формата.
  Кол-во строк будет такое как и кол-во объектов пользователей в ответе.
  
    Имя | Почта | Город 
    Имя | Почта | Город 
    и так далее для каждого пользователя...
*/

// SHORT

import { fetchUsers } from './services/api-service';
import makeUsersMarkup from '../templates/1-json_all.hbs';

const container = document.querySelector('#task-1');
const refs = {
  getBtn: container.querySelector('button'),
  userTable: container.querySelector('.users-table'),
};

const getUsers = () => {
  fetchUsers().then(data => renderUsers(data));
};

const renderUsers = users => {
  refs.userTable.innerHTML = makeUsersMarkup(users);
};

refs.getBtn.addEventListener('click', getUsers);

// LONG

// const tableHead = `
//    <thead>
//     <tr>
//       <th>Name</th>
//       <th>Email</th>
//       <th>City</th>
//     </tr>
//   </thead>`;

// const getUsers = () => {
//   fetch('https://jsonplaceholder.typicode.com/users')
//     .then(response => response.json())
//     .then(data => {
//       const markup = data
//     .map(
//       user => `
//         <tr>
//           <td>${user.name}</td>
//           <td>${user.email}</td>
//           <td>${user.address.city}</td>
//         </tr>
// `,
//     )
//     .join('');

//   refs.userTable.innerHTML = tableHead + markup;
//     });
// };
