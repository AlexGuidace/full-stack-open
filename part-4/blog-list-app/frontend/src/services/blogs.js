import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newBlog) => {
  // config is the Request Configuration settings we set in order to meet expectations set up at the endpoint on the backend.
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.post(baseUrl, newBlog, config);
  return request.then((response) => response.data);
};

const checkExistenceOfBlog = (encodedUrl) => {
  const request = axios.get(`${baseUrl}/${encodedUrl}`);
  return request.then((response) => response.data);
};

const updateLikesAndReturnUpdatedCollection = (id) => {
  const updateRequest = axios.put(`${baseUrl}/${id}`);
  return updateRequest.then(() => {
    const getAllRequest = axios.get(baseUrl);
    return getAllRequest.then((response) => response.data);
  });
};

export default {
  setToken,
  getAll,
  create,
  checkExistenceOfBlog,
  updateLikesAndReturnUpdatedCollection,
};
