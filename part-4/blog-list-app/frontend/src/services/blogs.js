import axios from 'axios';
const baseUrl = '/api/blogs';

let authToken = null;

const setToken = (newToken) => {
  authToken = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  // config is the Request Configuration settings we set in order to meet expectations set up at the endpoint on the backend.
  const config = {
    headers: { Authorization: authToken },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const checkExistenceOfBlog = async (encodedUrl) => {
  const response = await axios.get(`${baseUrl}/${encodedUrl}`);
  return response.data;
};

const updateLikesAndReturnUpdatedCollection = async (id) => {
  // Update Likes first.
  await axios.put(`${baseUrl}/${id}`);
  // Get all blogs and return them second.
  const response = await axios.get(baseUrl);
  return response.data;
};

export default {
  setToken,
  getAll,
  create,
  checkExistenceOfBlog,
  updateLikesAndReturnUpdatedCollection,
};
