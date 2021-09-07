import './css/styles.css';

import { error, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import { refs } from './js/refs';
import { fetchCountries } from './js/fetchCountries';

import makeCoutryList from './templates/country-list.hbs';
import makeCoutryListInfo from './templates/country-list-info.hbs';
const debounce = require('lodash.debounce');

const checkValue = searchQuery => {
  fetchCountries(searchQuery)
    .then(data => {
      if (data.length === 1) {
        const markUp = makeCoutryListInfo(data[0]);
        return renderCountry(markUp);
      }
      if (1 < data.length && data.length < 10) {
        const markUp = makeCoutryList(data);
        return renderCountry(markUp);
      }
      if (data.length >= 10) {
        renderCountry();
        return error({
          text: 'Too many matches found.Please enter a more specific query',
          delay: 1000,
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const onCountrySearch = e => {
  const inputCountry = e.target.value;
  checkValue(inputCountry);
};

function renderCountry(сountry = '') {
  refs.listCountry.innerHTML = сountry;
}

refs.inputRef.addEventListener('input', debounce(onCountrySearch, 500));
