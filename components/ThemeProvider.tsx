'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { THEME_STORAGE_KEY, isThemeMode, type ThemeMode } from './theme';

interface ThemeContextValue {
  theme: ThemeMode;
  isReady: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getPreferredTheme(): ThemeMode {
  if (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }

  return 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let nextTheme = getPreferredTheme();

    try {
      const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (isThemeMode(savedTheme)) {
        nextTheme = savedTheme;
      }
    } catch {
      nextTheme = getPreferredTheme();
    }

    document.documentElement.setAttribute('data-theme', nextTheme);
    setThemeState(nextTheme);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    document.documentElement.setAttribute('data-theme', theme);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage failures so the toggle continues to work in restricted environments.
    }
  }, [isReady, theme]);

  const value = useMemo<ThemeContextValue>(() => ({
    theme,
    isReady,
    setTheme: setThemeState,
    toggleTheme: () => {
      setThemeState((current) => (current === 'light' ? 'dark' : 'light'));
    },
  }), [isReady, theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}