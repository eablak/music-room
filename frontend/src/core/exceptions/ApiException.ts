import { IApiValidationError } from '@/src/types';

export class ApiException extends Error {
  readonly statusCode: number;
  readonly errors: IApiValidationError[];
  readonly endpoint: string;
  readonly isNetworkError: boolean;

  constructor(params: {
    statusCode: number;
    message: string;
    errors?: IApiValidationError[];
    endpoint?: string;
    isNetworkError?: boolean;
  }) {
    super(params.message);
    this.name = 'ApiException';
    this.statusCode = params.statusCode;
    this.errors = params.errors ?? [];
    this.endpoint = params.endpoint ?? 'unknown';
    this.isNetworkError = params.isNetworkError ?? false;

    Object.setPrototypeOf(this, ApiException.prototype);
  }

  get isAuthError(): boolean {
    return this.statusCode === 401 || this.statusCode === 403;
  }

  toDisplayMessage(): string {
    if (this.errors.length > 0) {
      return this.errors.map((e) => e.message).join('\n');
    }
    return this.message;
  }
}
