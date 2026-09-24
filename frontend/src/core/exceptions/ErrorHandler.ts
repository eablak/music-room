import { Platform } from 'react-native';
import { ApiException } from './ApiException';

type ToastFn = (message: string) => void;
let toastHandler: ToastFn | null = null;

export function setGlobalToastHandler(fn: ToastFn): void {
  toastHandler = fn;
}

export const ErrorHandler = {
  handle(error: unknown, context?: string): void {
    const apiException = toApiException(error);

    console.error(
      `[ErrorHandler${context ? ` :: ${context}` : ''}]`,
      `Status: ${apiException.statusCode}`,
      `Message: ${apiException.message}`,
      `Endpoint: ${apiException.endpoint}`,
      apiException.errors.length ? `Errors: ${JSON.stringify(apiException.errors)}` : '',
    );

    if (toastHandler) {
      toastHandler(apiException.toDisplayMessage());
    }
  },

  log(error: unknown, context?: string): void {
    const apiException = toApiException(error);
    console.warn(
      `[ErrorHandler.log${context ? ` :: ${context}` : ''}]`,
      apiException.statusCode,
      apiException.message,
    );
  },
};

function toApiException(error: unknown): ApiException {
  if (error instanceof ApiException) return error;

  if (error instanceof Error) {
    return new ApiException({
      statusCode: 0,
      message: error.message,
      isNetworkError: true,
    });
  }

  return new ApiException({
    statusCode: 0,
    message: 'Bilinmeyen bir hata oluştu.',
    isNetworkError: true,
  });
}

export function showFatalAlert(message: string): void {
  if (Platform.OS === 'web') {
    console.error('[Fatal]', message);
  }
}
