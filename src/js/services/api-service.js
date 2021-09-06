const BASE_JSON_URL = 'https://jsonplaceholder.typicode.com';

const BASE_WEATHER_URL = 'http://api.weatherstack.com';
const WEATHER_API_KEY = 'a2f4a19b05175ece9e4162c1948e6ca4';

const fetchUsers = (id = '') => {
  return fetch(`${BASE_JSON_URL}/users/${id}`).then(response => {
    if (response.status === 404) {
      return Promise.reject('Not found');
    }
    return response.json();

    // if (response.ok) {
    //   return response.json();
    // }
    // throw new Error('Not found');
  });
};

const fetchWeather = city => {
  const searchParams = new URLSearchParams({
    access_key: WEATHER_API_KEY,
    query: city,
  });

  return fetch(`${BASE_WEATHER_URL}/current?${searchParams}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        return Promise.reject(data.error);
      }
      return data;
    });

  // return fetch(`${BASE_WEATHER_URL}/current?access_key=${WEATHER_API_KEY}&query=${city}`).then(
  //   res => res.json(),
  // );
};

export { fetchUsers, fetchWeather };
