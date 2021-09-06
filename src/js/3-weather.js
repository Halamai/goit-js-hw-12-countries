/*
  Найти данные о текущей погоде в каком-то городе на weatherstack
  Написать функцию getWeather, которая использует
  API_URL + текущее значение input для составления запроса.
  
  Формат полного url таков:
    https://api.weatherstack.com/current
    ? access_key = YOUR_ACCESS_KEY
    & query = New York 
    
  Документация по Git API:
    https://weatherstack.com/documentation
    
  С помощью fetch сделать запрос по составленому адресу. 
  Обязательно обработать вариант с ошибкой запроса используя catch - "Your API request failed. Please try again or contact support." (сообщение приходит с АПИ)
  
  Результат запроса вывести в поле result в формате:
    Город, страна
    Дата время
    Темпереатура
    Описание погоды с картинкой
  
  Все необходимые данные есть в ответе от API.
  Переписать фетч-функцию, используя класс URLSearchParams.
  Проверять не пустой ли инпут.
*/

// const container = document.querySelector('#task-4');
// const refs = {
//   form: container.querySelector('.search-form'),
//   result: container.querySelector('.result'),
//   errorRef: container.querySelector('.error'),
// };

import getRefs from './services/getRefs';
import { fetchWeather } from './services/api-service';
import makeWeatherMarkup from '../templates/3-weather.hbs';

const refs = getRefs('#task-4');

const getWeather = e => {
  e.preventDefault();
  const city = e.currentTarget.elements.city.value;
  if (!city) {
    printResult();
    // refs.errorRef.textContent = '';
    // refs.result.innerHTML = '';

    alert('Enter city!');
    return;
  }
  fetchWeather(city).then(renderWeather).catch(handleError);
};

const renderWeather = ({ request, current, location }) => {
  const preparedData = {
    place: request.query,
    time: location.localtime,
    temp: current.temperature,
    desc: current.weather_descriptions[0],
    icon: current.weather_icons[0],
  };

  const markup = makeWeatherMarkup(preparedData);
  printResult(markup);
  // refs.result.innerHTML = makeWeatherMarkup(preparedData);
  // refs.errorRef.textContent = '';
};

const handleError = err => {
  printResult('', err.info);
  // refs.errorRef.textContent = err.info;
  // refs.result.innerHTML = '';
};

const printResult = (result = '', err = '') => {
  refs.result.innerHTML = result;
  refs.errorRef.textContent = err;
};

refs.form.addEventListener('submit', getWeather);

// const markupSample = `
// <div>
//   <h4>New York, United States of America</h4>
//   <p>2019-09-07 08:14</p>
//   <p>Current temperature: 13&degC</p>
//   <p>Sunny<img class="logo" src="https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png" alt="Sunny" width="50"></p>
// </div>`;
