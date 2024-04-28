import axios from 'axios';

const baseUrl = 'http://localhost:3002/persons';

const getPersons = () => {
  const getRequest = axios.get(baseUrl);
  return getRequest.then((response) => response.data);
};

const createPerson = (newPerson) => {
  // An incremental id is created by JSON-server automatically for each new POST request.
  const createRequest = axios.post(baseUrl, newPerson);
  return createRequest.then((response) => response.data);
};

const deletePerson = (personId) => {
  const deleteRequest = axios.delete(`${baseUrl}/${personId}`);
  return deleteRequest.then((response) => response.data);
};

export default { getPersons, createPerson, deletePerson };
