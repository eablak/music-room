import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { DarkColors, LightColors, AppColors } from '@/src/constants/theme';
import { useAppDispatch, useAppSelector } from '@/src/store';
import { setThemeMode, hydrateTheme } from '@/src/store/slices/app.slice';
import { themeStorage } from '@/src/utils/storage';
import { AppThemeMode } from '@/src/types';

interface ThemeContextValue {
  colors: AppColors & { isDark: boolean };
  themeMode: AppThemeMode;
  setMode: (mode: AppThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((s) => s.app.themeMode);
  const systemScheme = useColorScheme();

  useEffect(() => {
    dispatch(hydrateTheme());
  }, [dispatch]);

  const isDark = useMemo(() => {
    if (themeMode === 'system') return systemScheme === 'dark';
    return themeMode === 'dark';
  }, [themeMode, systemScheme]);

  const colors = useMemo<AppColors & { isDark: boolean }>(
    () => ({ ...(isDark ? DarkColors : LightColors), isDark }),
    [isDark],
  );

  const setMode = (mode: AppThemeMode) => {
    dispatch(setThemeMode(mode));
    themeStorage.set(mode);
  };

  return (
    <ThemeContext.Provider value={{ colors, themeMode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeColors(): AppColors & { isDark: boolean } {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeColors must be used within ThemeProvider');
  return ctx.colors;
}

export function useThemeMode(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeMode must be used within ThemeProvider');
  return ctx;
}
