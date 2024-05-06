// [Documentation for REST Countries API](https://studies.cs.helsinki.fi/restcountries/)

import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAllCountries = () => {
  const getRequest = axios.get(`${baseUrl}/all`);
  const data = getRequest.then((response) => response.data);
  return data;
};

const getCountry = (name) => {
  const getRequest = axios.get(`${baseUrl}/name/${name}`);
  const data = getRequest.then((response) => response.data);
  return data;
};

export default { getAllCountries, getCountry };
