/*
  Документация API: https://jsonplaceholder.typicode.com/

  Написать функцию getUserById, которая по событию сабмит на форме посылает запрос на получение информации о пользоватеьте с id (число) введенным в input. 
 
  Объект, который придет в ответе, используйте для вывода информации о пользователе в элементе .result
  
  Если пользователя с таким идентификатором в базе данных нет, в элемент .error вывести строку `Ошибка! Пользователя с id "${id}" не существует`
*/

import { fetchUsers } from './services/api-service';
import makeUserMarkup from '../templates/2-json_id.hbs';

const container = document.querySelector('#task-2');
const refs = {
  formRef: container.querySelector('.search-form'),
  resultRef: container.querySelector('.result'),
  errorRef: container.querySelector('.error'),
};

const onUserSearch = e => {
  e.preventDefault();
  const userId = e.currentTarget.elements.userId.value;

  fetchUsers(userId)
    .then(renderUser)
    .catch(err => {
      handleError(err, userId);
    });

  // fetchUsers(userId).then(user => {
  //   renderUser(user);
  // });
};

const renderUser = user => {
  refs.errorRef.textContent = '';
  refs.resultRef.innerHTML = makeUserMarkup(user);
};

const handleError = (err, userId) => {
  refs.resultRef.innerHTML = '';
  refs.errorRef.textContent = `Ошибка! Пользователя с id "${userId}" не существует`;
  console.log(err);
};

refs.formRef.addEventListener('submit', onUserSearch);

// const markupSample = `
// <table>
//   <tbody>
//     <tr>
//       <th>User ID:  &emsp;</th>
//       <td>2</td>
//     </tr>
//     <tr>
//       <th>User name:  &emsp;</th>
//       <td>Leanne Graham</td>
//     </tr>
//     <tr>
//       <th>Company:  &emsp;</th>
//       <td>Romaguera-Crona</td>
//     </tr>
//   </tbody>
// </table>`;
