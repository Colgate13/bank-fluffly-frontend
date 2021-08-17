import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bank-fluffly-backend.herokuapp.com',
});

export default api;
