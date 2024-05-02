import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAllCountries = () => {
  const getRequest = axios.get(`${baseUrl}/all`);
  return getRequest.then((response) => response.data);
};

const getSearchedCountries = (nameValue) => {
  const getRequest = axios.get(`${baseUrl}/name/${nameValue}`);
  return getRequest.then((response) => response.data);
};

export default { getAllCountries, getSearchedCountries };
