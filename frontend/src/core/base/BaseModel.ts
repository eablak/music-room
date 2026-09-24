import { IApiResponse, IBaseModel } from '@/src/types';

export type { IBaseModel, IApiResponse };

export type IBaseEntity<T extends object> = IBaseModel & T;
