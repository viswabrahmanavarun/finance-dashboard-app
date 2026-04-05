import { create } from 'zustand';

const THEME_STORAGE_KEY = 'finance-dashboard:theme';

const useThemeStore = create((set) => ({
  isDarkMode: (() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored !== null) {
        return JSON.parse(stored);
      }
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  })(),

  toggleDarkMode: () => {
    set((state) => {
      const newDarkMode = !state.isDarkMode;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newDarkMode));
      } catch (error) {
        console.error('Failed to save theme preference:', error);
      }
      
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return { isDarkMode: newDarkMode };
    });
  },

  setDarkMode: (isDark) => {
    set(() => {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isDark));
      } catch (error) {
        console.error('Failed to save theme preference:', error);
      }
      
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return { isDarkMode: isDark };
    });
  },

  initializeDarkMode: () => {
    set((state) => {
      const isDark = state.isDarkMode;
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { isDarkMode: isDark };
    });
  },
}));

export default useThemeStore;
