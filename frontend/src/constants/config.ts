import { AppThemeMode } from '@/src/types';

export const AppConfig = {
  API_BASE_URL: 'https://jsonplaceholder.typicode.com',
  API_TIMEOUT_MS: 15000,
  APP_NAME: 'Enterprise Boilerplate',
} as const;

export const StorageKeys = {
  AUTH_TOKENS: 'app_auth_tokens',
  THEME_MODE: 'app_theme_mode',
} as const;

export const DEFAULT_THEME_MODE: AppThemeMode = 'system';

export const HttpStatus = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
  INTERNAL_ERROR: 500,
} as const;
