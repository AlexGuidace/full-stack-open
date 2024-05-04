// [Documentation for OpenWeatherMap 'Current Weather Data' API](https://openweathermap.org/current)

import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const getCountryCapitalWeather = (coordinates) => {
  // An entry in the Countries API may have no capitalInfo information (and thus, no coordinates), e.g., United States Minor Outlying Islands. If that information is undefined, we send back a string message. Otherwise, we make a request to the API to return the current weather of the capital.
  return new Promise((resolve) => {
    if (coordinates === undefined) {
      resolve('No capital information was found for this entry.');
    } else {
      const getRequest = axios.get(
        `${baseUrl}?units=imperial&lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${api_key}`
      );
      getRequest.then((response) => {
        resolve(response.data);
      });
    }
  });
};

export default { getCountryCapitalWeather };
