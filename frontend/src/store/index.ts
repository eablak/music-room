import {
  configureStore,
  createListenerMiddleware,
  TypedAddListener,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { baseApi } from './api/baseApi';
import appReducer from './slices/app.slice';

const listenerMiddlewareInstance = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    app: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      listenerMiddlewareInstance.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function resetStore(): void {
  store.dispatch(baseApi.util.resetApiState());
}

export const listenerMiddleware = listenerMiddlewareInstance;
export type AppAddListener = TypedAddListener<RootState, AppDispatch>;
