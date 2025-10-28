import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const register = (userData) => api.post('/auth/register', userData);
export const login = (userData) => api.post('/auth/login', userData);

export const getAnimes = () => api.get('/animes');
export const addAnime = (formData) => api.post('/animes', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const updateAnime = (id, data) => api.patch(`/animes/${id}`, data);
export const deleteAnime = (id) => api.delete(`/animes/${id}`);

export default api;