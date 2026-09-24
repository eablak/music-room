import { secureStorage, fastStorage, tokenStorage } from '@/src/utils/storage';
import { StorageKeys } from '@/src/constants/config';
import * as SecureStore from 'expo-secure-store';

beforeEach(() => {
  jest.clearAllMocks();
  fastStorage.clearAll();
});

describe('fastStorage (MMKV-backed)', () => {
  it('writes and reads a string value', () => {
    fastStorage.set('test_key', 'hello world');
    expect(fastStorage.get<string>('test_key')).toBe('hello world');
  });

  it('writes and reads an object', () => {
    const obj = { name: 'John', age: 30, active: true };
    fastStorage.set('user_obj', obj);
    expect(fastStorage.get<typeof obj>('user_obj')).toEqual(obj);
  });

  it('returns null for a missing key', () => {
    expect(fastStorage.get<string>('nonexistent')).toBeNull();
  });

  it('removes a value', () => {
    fastStorage.set('to_remove', 'data');
    expect(fastStorage.contains('to_remove')).toBe(true);
    fastStorage.remove('to_remove');
    expect(fastStorage.contains('to_remove')).toBe(false);
    expect(fastStorage.get<string>('to_remove')).toBeNull();
  });

  it('clears all data', () => {
    fastStorage.set('a', 1);
    fastStorage.set('b', 2);
    fastStorage.clearAll();
    expect(fastStorage.contains('a')).toBe(false);
    expect(fastStorage.contains('b')).toBe(false);
  });
});

describe('secureStorage (expo-secure-store-backed)', () => {
  it('writes a value via SecureStore.setItemAsync', async () => {
    await secureStorage.set('secret', { token: 'abc123' });
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      'secret',
      JSON.stringify({ token: 'abc123' }),
      { keychainAccessible: SecureStore.WHEN_UNLOCKED },
    );
  });

  it('reads a value via SecureStore.getItemAsync', async () => {
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({ token: 'abc123' }),
    );
    const result = await secureStorage.get<{ token: string }>('secret');
    expect(result).toEqual({ token: 'abc123' });
    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('secret');
  });

  it('returns null when SecureStore has no value', async () => {
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(null);
    const result = await secureStorage.get<string>('missing');
    expect(result).toBeNull();
  });

  it('removes a value via SecureStore.deleteItemAsync', async () => {
    await secureStorage.remove('secret');
    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('secret');
  });
});

describe('tokenStorage', () => {
  it('persists and retrieves auth tokens via secureStorage', async () => {
    const tokens = { accessToken: 'access_123', refreshToken: 'refresh_456' };
    await tokenStorage.set(tokens);
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      StorageKeys.AUTH_TOKENS,
      JSON.stringify(tokens),
      { keychainAccessible: SecureStore.WHEN_UNLOCKED },
    );

    (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(tokens),
    );
    const retrieved = await tokenStorage.get();
    expect(retrieved).toEqual(tokens);
  });

  it('clears tokens via SecureStore.deleteItemAsync', async () => {
    await tokenStorage.clear();
    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(StorageKeys.AUTH_TOKENS);
  });
});
