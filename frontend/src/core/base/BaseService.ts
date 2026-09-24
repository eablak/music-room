import { AxiosRequestConfig } from 'axios';
import { request } from '@/src/core/network/interceptors';
import { ApiException } from '@/src/core/exceptions/ApiException';
import { ErrorHandler } from '@/src/core/exceptions/ErrorHandler';
import { IApiResponse } from '@/src/types';

export abstract class BaseService {
  protected abstract readonly basePath: string;

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<IApiResponse<T>> {
    return this.execute<T>({ method: 'GET', url, ...config });
  }

  protected async post<T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<IApiResponse<T>> {
    return this.execute<T>({ method: 'POST', url, data: body, ...config });
  }

  protected async put<T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<IApiResponse<T>> {
    return this.execute<T>({ method: 'PUT', url, data: body, ...config });
  }

  protected async patch<T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<IApiResponse<T>> {
    return this.execute<T>({ method: 'PATCH', url, data: body, ...config });
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<IApiResponse<T>> {
    return this.execute<T>({ method: 'DELETE', url, ...config });
  }

  private async execute<T>(config: AxiosRequestConfig): Promise<IApiResponse<T>> {
    try {
      return await request<T>(config);
    } catch (error) {
      if (error instanceof ApiException) throw error;
      throw new ApiException({
        statusCode: 0,
        message: (error as Error)?.message ?? 'Bilinmeyen hata',
        isNetworkError: true,
      });
    }
  }
}

export function logAndRethrow(error: unknown, context: string): never {
  ErrorHandler.log(error, context);
  throw error;
}
