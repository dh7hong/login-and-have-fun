import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.38.191.164',
  withCredentials: true,
});

export default api;

