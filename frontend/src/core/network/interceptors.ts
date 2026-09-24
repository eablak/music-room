import { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { apiClient } from './api.client';
import { ApiException } from '@/src/core/exceptions/ApiException';
import { HttpStatus } from '@/src/constants/config';
import { tokenStorage } from '@/src/utils/storage';
import { IApiValidationError, IApiResponse } from '@/src/types';

let isRefreshing = false;

type PendingRequest = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};
let pendingQueue: PendingRequest[] = [];

function subscribeTokenRefresh(): Promise<string | null> {
  return new Promise<string | null>((resolve, reject) => {
    pendingQueue.push({ resolve, reject });
  });
}

function notifyQueue(token: string | null, error: unknown | null): void {
  pendingQueue.forEach((pending) => {
    if (error) pending.reject(error);
    else pending.resolve(token);
  });
  pendingQueue = [];
}

async function performTokenRefresh(): Promise<string | null> {
  const tokens = await tokenStorage.get();
  if (!tokens?.refreshToken) return null;

  try {
    const newAccessToken = `refreshed_${Date.now()}`;
    await tokenStorage.set({ accessToken: newAccessToken, refreshToken: tokens.refreshToken });
    return newAccessToken;
  } catch {
    await tokenStorage.clear();
    return null;
  }
}

function toApiException(error: AxiosError<unknown>): ApiException {
  const endpoint = error.config?.url ?? 'unknown';
  const status = error.response?.status ?? 0;

  if (!error.response) {
    return new ApiException({
      statusCode: 0,
      message: error.code === 'ECONNABORTED'
        ? 'İstek zaman aşımına uğradı. Lütfen tekrar deneyin.'
        : 'Ağ bağlantısı hatası. İnternet bağlantınızı kontrol edin.',
      endpoint,
      isNetworkError: true,
    });
  }

  const payload = error.response?.data as Record<string, unknown> | undefined;
  const message =
    (payload?.message as string | undefined) ?? `Sunucu hatası (${status}).`;
  const errors = (payload?.errors as IApiValidationError[] | undefined) ?? [];

  return new ApiException({ statusCode: status, message, errors, endpoint });
}

export function setupInterceptors(onSessionExpired: () => void): void {
  apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const tokens = await tokenStorage.get();
      if (tokens?.accessToken) {
        config.headers.set('Authorization', `Bearer ${tokens.accessToken}`);
      }
      console.log(`[API →] ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error: unknown) => Promise.reject(error),
  );

  apiClient.interceptors.response.use(
    (response) => {
      console.log(`[API ←] ${response.status} ${response.config.url}`);
      return response;
    },
    async (error: AxiosError<unknown>) => {
      const originalRequest = error.config as
        | (InternalAxiosRequestConfig & { _retry?: boolean })
        | undefined;

      if (
        error.response?.status === HttpStatus.UNAUTHORIZED &&
        originalRequest &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        if (isRefreshing) {
          try {
            const newToken = await subscribeTokenRefresh();
            if (!newToken) {
              onSessionExpired();
              return Promise.reject(toApiException(error));
            }
            originalRequest.headers.set('Authorization', `Bearer ${newToken}`);
            return apiClient(originalRequest as AxiosRequestConfig);
          } catch (refreshError) {
            return Promise.reject(toApiException(refreshError as AxiosError));
          }
        }

        isRefreshing = true;
        try {
          const newToken = await performTokenRefresh();
          notifyQueue(newToken, newToken ? null : toApiException(error));

          if (!newToken) {
            onSessionExpired();
            return Promise.reject(toApiException(error));
          }

          originalRequest.headers.set('Authorization', `Bearer ${newToken}`);
          return apiClient(originalRequest as AxiosRequestConfig);
        } catch (refreshError) {
          notifyQueue(null, toApiException(refreshError as AxiosError));
          onSessionExpired();
          return Promise.reject(toApiException(refreshError as AxiosError));
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(toApiException(error));
    },
  );
}

export async function request<T>(config: AxiosRequestConfig): Promise<IApiResponse<T>> {
  const response = await apiClient.request<IApiResponse<T>>(config);
  return response.data;
}
