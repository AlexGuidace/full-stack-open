import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAllCountries = () => {
  const getRequest = axios.get(`${baseUrl}/all`);
  return getRequest.then((response) => response.data);
};

const getCountry = (name) => {
  const getRequest = axios.get(`${baseUrl}/name/${name}`);
  return getRequest.then((response) => response.data);
};

export default { getAllCountries, getCountry };
