import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3131',
});

export default api;
