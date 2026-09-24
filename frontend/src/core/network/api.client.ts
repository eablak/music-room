import { AppConfig } from '@/src/constants/config';
import axios, { AxiosInstance } from 'axios';

export const apiClient: AxiosInstance = axios.create({
  baseURL: AppConfig.API_BASE_URL,
  timeout: AppConfig.API_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
