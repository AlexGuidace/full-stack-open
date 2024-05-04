// [Documentation for OpenWeatherMap 'Current Weather Data' API](https://openweathermap.org/current)

import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const getCountryCapitalWeather = (latitude, longitude) => {
  const getRequest = axios.get(
    `${baseUrl}?units=imperial&lat=${latitude}&lon=${longitude}&appid=${api_key}`
  );
  const data = getRequest.then((response) => response.data);
  return data;
};

export default { getCountryCapitalWeather };
