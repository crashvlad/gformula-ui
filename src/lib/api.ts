import axios from 'axios';
import { BASE_URL } from './contants';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
