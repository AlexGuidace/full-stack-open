import axios from 'axios';

// Express server is hosted on port 3001.
const baseUrl = 'http://localhost:3001/api/persons';

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

const updatePersonNumber = (person, number) => {
  const updateRequest = axios.put(`${baseUrl}/${person.id}`, {
    ...person,
    number: number,
  });
  return updateRequest.then((response) => response.data);
};

export default { getPersons, createPerson, deletePerson, updatePersonNumber };
