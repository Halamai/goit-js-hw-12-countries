const BASE_JSON_URL = 'https://restcountries.eu/rest/v2/name';

export const fetchCountries = searchQuery => {
  return fetch(`${BASE_JSON_URL}/${searchQuery}`)
    .then(response => {
      return response.json();
    })

    .catch(err => {
      console.log(err);
    });
};
