import axios from 'axios';
import { BASE_URL } from './contants';
import { getAccessToken } from './utils';

const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authApi.interceptors.request.use((config) => {
  const accToken = getAccessToken('acc_token');

  if (accToken) {
    config.headers.Authorization = `Bearer ${JSON.parse(accToken || '')}`;
  }

  return config;
});

export { authApi };
