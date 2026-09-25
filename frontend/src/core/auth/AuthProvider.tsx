import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { secureStorage, tokenStorage } from '@/src/utils/storage';
import { IAuthContextValue, IAuthSession, IAuthUser } from '@/src/types/auth';
import { StorageKeys } from '@/src/constants/config';
import { useLoginMutation } from '@/src/store/api/authApi';

const AuthContext = createContext<IAuthContextValue | null>(null);

const SESSION_KEY = StorageKeys.AUTH_SESSION;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<IAuthSession | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [login] = useLoginMutation();

  useEffect(() => {
    secureStorage.get<IAuthSession>(SESSION_KEY).then((restored) => {
      if (restored) setSession(restored);
      setInitializing(false);
    });
  }, []);

  const persistSession = useCallback(async (s: IAuthSession | null) => {
    setSession(s);
    if (s) {
      secureStorage.set(SESSION_KEY, s);
      await tokenStorage.set({ accessToken: s.accessToken, });
    } else {
      secureStorage.remove(SESSION_KEY);
      await tokenStorage.clear();
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {

    if (!email || !password){
      throw new Error('E-posta veya şifre hatalı');
    }

    try{
      const result = await login({ email, password, }).unwrap();
      const user: IAuthUser = {
        id: result.user.id!,
        name: result.user.name,
        surname: result.user.surname,
        username: result.user.username,
        email: result.user.email!,
      };

      const newSession: IAuthSession = { user, accessToken: result.accessToken };

      await persistSession(newSession);
    }catch(error: any){
      const message = error?.data?.message || error?.message || "Giriş yapılamadı!";
      throw new Error(message);
    }
  },
  [login, persistSession],
);


  const signUp = useCallback(async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('E-posta veya şifre hatalı.');
    }
    // sign up ve sign out yok şu an
    // const user: IAuthUser = { id: `user_${Date.now()}`, email };
    // const newSession: IAuthSession = {
    //   user,
    //   accessToken: `access_${Date.now()}`,
    //   refreshToken: `refresh_${Date.now()}`,
    // };
    // persistSession(newSession);
  // }, [persistSession]);
  }, []);


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
