import { useEffect } from 'react';
import useThemeStore from '../store/themeStore';

export const useTheme = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);
  const setDarkMode = useThemeStore((state) => state.setDarkMode);
  const initializeDarkMode = useThemeStore((state) => state.initializeDarkMode);

  useEffect(() => {
    initializeDarkMode();
  }, []);

  return {
    isDarkMode,
    toggleDarkMode,
    setDarkMode,
    initializeDarkMode, // 🔥 ADD THIS LINE
  };
};