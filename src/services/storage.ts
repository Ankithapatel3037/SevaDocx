import { Service, UserSettings } from '../types';

const KEYS = {
  FAVORITES: 'sevdocs_favorites',
  RECENTS: 'sevdocs_recents',
  CHECKLISTS: 'sevdocs_checklists',
  SETTINGS: 'sevdocs_settings',
  ADMIN_AUTH: 'sevdocs_admin_auth',
  SERVICES_OVERRIDE: 'sevdocs_services_override',
};

export const getStoredFavorites = (): string[] => {
  try {
    const data = localStorage.getItem(KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveStoredFavorites = (favorites: string[]): void => {
  try {
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
  } catch (e) {
    console.error('Error saving favorites', e);
  }
};

export const getStoredRecents = (): string[] => {
  try {
    const data = localStorage.getItem(KEYS.RECENTS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const addStoredRecent = (serviceId: string): string[] => {
  try {
    const recents = getStoredRecents().filter(id => id !== serviceId);
    const updated = [serviceId, ...recents].slice(0, 12);
    localStorage.setItem(KEYS.RECENTS, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

export const getStoredChecklists = (): Record<string, { checkedDocumentIds: string[]; updatedAt: string }> => {
  try {
    const data = localStorage.getItem(KEYS.CHECKLISTS);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

export const saveStoredChecklist = (
  serviceId: string,
  checkedDocumentIds: string[]
): Record<string, { checkedDocumentIds: string[]; updatedAt: string }> => {
  try {
    const checklists = getStoredChecklists();
    checklists[serviceId] = {
      checkedDocumentIds,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(KEYS.CHECKLISTS, JSON.stringify(checklists));
    return checklists;
  } catch {
    return {};
  }
};

export const clearStoredChecklist = (serviceId: string): void => {
  try {
    const checklists = getStoredChecklists();
    delete checklists[serviceId];
    localStorage.setItem(KEYS.CHECKLISTS, JSON.stringify(checklists));
  } catch (e) {
    console.error('Error clearing checklist', e);
  }
};

export const getStoredSettings = (): UserSettings => {
  try {
    const data = localStorage.getItem(KEYS.SETTINGS);
    if (data) return JSON.parse(data);
  } catch {
    // fallback
  }
  return {
    language: 'en',
    theme: 'light',
    notificationsEnabled: true,
  };
};

export const saveStoredSettings = (settings: UserSettings): void => {
  try {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving settings', e);
  }
};

export const isAdminAuthenticated = (): boolean => {
  try {
    return localStorage.getItem(KEYS.ADMIN_AUTH) === 'true';
  } catch {
    return false;
  }
};

export const setAdminAuthenticated = (auth: boolean): void => {
  try {
    if (auth) {
      localStorage.setItem(KEYS.ADMIN_AUTH, 'true');
    } else {
      localStorage.removeItem(KEYS.ADMIN_AUTH);
    }
  } catch (e) {
    console.error('Error updating admin auth', e);
  }
};

export const getStoredServicesOverride = (): Service[] | null => {
  try {
    const data = localStorage.getItem(KEYS.SERVICES_OVERRIDE);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveStoredServicesOverride = (services: Service[]): void => {
  try {
    localStorage.setItem(KEYS.SERVICES_OVERRIDE, JSON.stringify(services));
  } catch (e) {
    console.error('Error saving services override', e);
  }
};

export const resetStoredServices = (): void => {
  try {
    localStorage.removeItem(KEYS.SERVICES_OVERRIDE);
  } catch (e) {
    console.error('Error resetting services override', e);
  }
};
