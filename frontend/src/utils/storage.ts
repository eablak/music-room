import { Platform } from 'react-native';
import type { MMKV } from 'react-native-mmkv';
import * as SecureStore from 'expo-secure-store';
import { IAuthTokens } from '@/src/types';
import { StorageKeys, DEFAULT_THEME_MODE } from '@/src/constants/config';
import { AppThemeMode } from '@/src/types';

interface IKVStorage {
  getString(key: string): string | undefined;
  set(key: string, value: string): void;
  remove(key: string): void;
  contains(key: string): boolean;
  clearAll(): void;
}

class WebStorage implements IKVStorage {
  private store: Record<string, string> = {};

  getString(key: string): string | undefined {
    if (typeof localStorage !== 'undefined') {
      try {
        const val = localStorage.getItem(key);
        return val !== null ? val : undefined;
      } catch {}
    }
    return this.store[key] ?? undefined;
  }

  set(key: string, value: string): void {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(key, value);
      } catch {}
    }
    this.store[key] = value;
  }

  remove(key: string): void {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.removeItem(key);
      } catch {}
    }
    delete this.store[key];
  }

  contains(key: string): boolean {
    if (typeof localStorage !== 'undefined') {
      try {
        return localStorage.getItem(key) !== null;
      } catch {}
    }
    return key in this.store;
  }

  clearAll(): void {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.clear();
      } catch {}
    }
    this.store = {};
  }
}

function createFastStorage(): IKVStorage {
  if (Platform.OS === 'web') {
    return new WebStorage();
  }
  try {
    const { createMMKV } = require('react-native-mmkv');
    return createMMKV({ id: 'fast-storage' }) as unknown as IKVStorage;
  } catch (error) {
    console.warn(
      '[Storage] MMKV native module is not available (e.g. running in Expo Go). Falling back to WebStorage shim.'
    );
    return new WebStorage();
  }
}

const kv: IKVStorage = createFastStorage();

export const fastStorage = {
  get<T>(key: string): T | null {
    const raw = kv.getString(key);
    if (raw === undefined) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    kv.set(key, JSON.stringify(value));
  },

  remove(key: string): void {
    kv.remove(key);
  },

  contains(key: string): boolean {
    return kv.contains(key);
  },

  clearAll(): void {
    kv.clearAll();
  },
};

function sanitizeSecureKey(key: string): string {
  return key.replace(/[^a-zA-Z0-9._-]/g, '_');
}

export const secureStorage = {
  async get<T>(key: string): Promise<T | null> {
    if (Platform.OS === 'web') {
      return fastStorage.get<T>(key);
    }
    const safeKey = sanitizeSecureKey(key);
    const raw = await SecureStore.getItemAsync(safeKey);
    if (raw === null || raw === undefined) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  async set<T>(key: string, value: T): Promise<void> {
    if (Platform.OS === 'web') {
      fastStorage.set(key, value);
      return;
    }
    const safeKey = sanitizeSecureKey(key);
    await SecureStore.setItemAsync(safeKey, JSON.stringify(value), {
      keychainAccessible: SecureStore.WHEN_UNLOCKED,
    });
  },

  async remove(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      fastStorage.remove(key);
      return;
    }
    const safeKey = sanitizeSecureKey(key);
    await SecureStore.deleteItemAsync(safeKey);
  },
};

export const tokenStorage = {
  get: () => secureStorage.get<IAuthTokens>(StorageKeys.AUTH_TOKENS),
  set: (tokens: IAuthTokens) => secureStorage.set(StorageKeys.AUTH_TOKENS, tokens),
  clear: () => secureStorage.remove(StorageKeys.AUTH_TOKENS),
};

export const themeStorage = {
  get: () => fastStorage.get<AppThemeMode>(StorageKeys.THEME_MODE),
  set: (mode: AppThemeMode) => fastStorage.set(StorageKeys.THEME_MODE, mode),
  clear: () => fastStorage.remove(StorageKeys.THEME_MODE),
  getDefault: () => DEFAULT_THEME_MODE,
};

export const storage = {
  get: fastStorage.get,
  set: fastStorage.set,
  remove: fastStorage.remove,
};

export type { MMKV };
