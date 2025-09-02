import axios from 'axios';
const baseUrl = '/api/login';

// Log user in and get token, username, name back.
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
