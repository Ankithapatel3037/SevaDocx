import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSettings } from '../types';
import {
  getStoredFavorites,
  saveStoredFavorites,
  getStoredRecents,
  addStoredRecent,
  getStoredChecklists,
  saveStoredChecklist,
  getStoredSettings,
  saveStoredSettings,
  isAdminAuthenticated,
  setAdminAuthenticated,
} from '../services/storage';
import { translations, LanguageCode, TranslationDictionary } from '../i18n/translations';

interface AppContextType {
  // i18n
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationDictionary;

  // Theme
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;

  // Favorites
  favorites: string[];
  isFavorite: (serviceId: string) => boolean;
  toggleFavorite: (serviceId: string) => void;

  // Recents
  recents: string[];
  addRecentService: (serviceId: string) => void;

  // Checklists
  checklists: Record<string, { checkedDocumentIds: string[]; updatedAt: string }>;
  isDocumentChecked: (serviceId: string, docId: string) => boolean;
  toggleDocumentCheck: (serviceId: string, docId: string) => void;
  getChecklistProgress: (
    serviceId: string,
    totalDocuments: number
  ) => { completed: number; total: number; percent: number };

  // Admin session
  isAdmin: boolean;
  setAdmin: (auth: boolean) => void;

  // Notifications
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;

  // Reset user data
  clearUserData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialSettings = getStoredSettings();

  const [language, setLanguageState] = useState<LanguageCode>(initialSettings.language || 'en');
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(
    initialSettings.theme || 'light'
  );
  const [notificationsEnabled, setNotificationsState] = useState<boolean>(
    initialSettings.notificationsEnabled ?? true
  );

  const [favorites, setFavorites] = useState<string[]>([]);
  const [recents, setRecents] = useState<string[]>([]);
  const [checklists, setChecklists] = useState<
    Record<string, { checkedDocumentIds: string[]; updatedAt: string }>
  >({});
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Initialize data from localStorage on mount
  useEffect(() => {
    setFavorites(getStoredFavorites());
    setRecents(getStoredRecents());
    setChecklists(getStoredChecklists());
    setIsAdmin(isAdminAuthenticated());
  }, []);

  // Sync theme to DOM html class
  useEffect(() => {
    const root = document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Update Settings
  const persistSettings = (updated: Partial<UserSettings>) => {
    const newSettings: UserSettings = {
      language: updated.language || language,
      theme: updated.theme || theme,
      notificationsEnabled:
        updated.notificationsEnabled !== undefined
          ? updated.notificationsEnabled
          : notificationsEnabled,
    };
    saveStoredSettings(newSettings);
  };

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    persistSettings({ language: lang });
  };

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
    persistSettings({ theme: newTheme });
  };

  const setNotificationsEnabled = (enabled: boolean) => {
    setNotificationsState(enabled);
    persistSettings({ notificationsEnabled: enabled });
  };

  // Favorites logic
  const isFavorite = (serviceId: string) => favorites.includes(serviceId);

  const toggleFavorite = (serviceId: string) => {
    setFavorites(prev => {
      const next = prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId];
      saveStoredFavorites(next);
      return next;
    });
  };

  // Recents logic
  const addRecentService = (serviceId: string) => {
    const updated = addStoredRecent(serviceId);
    setRecents(updated);
  };

  // Checklist logic
  const isDocumentChecked = (serviceId: string, docId: string): boolean => {
    const serviceChecklist = checklists[serviceId];
    if (!serviceChecklist) return false;
    return serviceChecklist.checkedDocumentIds.includes(docId);
  };

  const toggleDocumentCheck = (serviceId: string, docId: string) => {
    setChecklists(prev => {
      const current = prev[serviceId]?.checkedDocumentIds || [];
      const updatedDocs = current.includes(docId)
        ? current.filter(id => id !== docId)
        : [...current, docId];

      const newChecklists = saveStoredChecklist(serviceId, updatedDocs);
      return { ...prev, ...newChecklists };
    });
  };

  const getChecklistProgress = (serviceId: string, totalDocuments: number) => {
    const checked = checklists[serviceId]?.checkedDocumentIds.length || 0;
    const completed = Math.min(checked, totalDocuments);
    const percent = totalDocuments > 0 ? Math.round((completed / totalDocuments) * 100) : 0;
    return { completed, total: totalDocuments, percent };
  };

  const setAdmin = (auth: boolean) => {
    setIsAdmin(auth);
    setAdminAuthenticated(auth);
  };

  const clearUserData = () => {
    saveStoredFavorites([]);
    localStorage.removeItem('sevdocs_recents');
    localStorage.removeItem('sevdocs_checklists');
    setFavorites([]);
    setRecents([]);
    setChecklists({});
  };

  const t = translations[language] || translations.en;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        theme,
        setTheme,
        favorites,
        isFavorite,
        toggleFavorite,
        recents,
        addRecentService,
        checklists,
        isDocumentChecked,
        toggleDocumentCheck,
        getChecklistProgress,
        isAdmin,
        setAdmin,
        notificationsEnabled,
        setNotificationsEnabled,
        clearUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
