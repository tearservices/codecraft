import { createContext, useContext, useEffect, useState } from 'react';
import * as themeLib from '../lib/theme.js';
import { useProfile } from './ProfileContext.jsx';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const { activeProfile } = useProfile();
  const [theme, setThemeState] = useState(
    () => themeLib.getStoredTheme(activeProfile) || themeLib.getSystemTheme()
  );

  useEffect(() => {
    setThemeState(themeLib.getStoredTheme(activeProfile) || themeLib.getSystemTheme());
  }, [activeProfile]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setThemeState(next);
    themeLib.setStoredTheme(activeProfile, next);
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
