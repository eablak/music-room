import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { secureStorage } from '@/src/utils/storage';
import { IAuthContextValue, IAuthSession, IAuthUser } from '@/src/types/auth';
import { StorageKeys } from '@/src/constants/config';

const AuthContext = createContext<IAuthContextValue | null>(null);

const SESSION_KEY = StorageKeys.AUTH_TOKENS;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<IAuthSession | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    secureStorage.get<IAuthSession>(SESSION_KEY).then((restored) => {
      if (restored) setSession(restored);
      setInitializing(false);
    });
  }, []);

  const persistSession = useCallback((s: IAuthSession | null) => {
    setSession(s);
    if (s) {
      secureStorage.set(SESSION_KEY, s);
    } else {
      secureStorage.remove(SESSION_KEY);
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('E-posta veya şifre hatalı.');
    }
    const user: IAuthUser = { id: `user_${Date.now()}`, email };
    const newSession: IAuthSession = {
      user,
      accessToken: `access_${Date.now()}`,
      refreshToken: `refresh_${Date.now()}`,
    };
    persistSession(newSession);
  }, [persistSession]);

  const signUp = useCallback(async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('E-posta veya şifre hatalı.');
    }
    const user: IAuthUser = { id: `user_${Date.now()}`, email };
    const newSession: IAuthSession = {
      user,
      accessToken: `access_${Date.now()}`,
      refreshToken: `refresh_${Date.now()}`,
    };
    persistSession(newSession);
  }, [persistSession]);

  const signOut = useCallback(async () => {
    persistSession(null);
  }, [persistSession]);

  const resetPassword = useCallback(async (email: string) => {
    if (!email) {
      throw new Error('Sıfırlama e-postası gönderilemedi.');
    }
  }, []);

  const value: IAuthContextValue = {
    session,
    user: session?.user ?? null,
    initializing,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): IAuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
