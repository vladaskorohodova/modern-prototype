'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'modern-prototype-theme';

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
    const savedTheme = window.localStorage.getItem(STORAGE_KEY);
    const nextTheme = savedTheme === 'light' || savedTheme === 'dark'
      ? savedTheme
      : getPreferredTheme();

    document.documentElement.setAttribute('data-theme', nextTheme);
    setThemeState(nextTheme);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
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