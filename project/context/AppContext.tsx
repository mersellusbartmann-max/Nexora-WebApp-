import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { Platform } from 'react-native';
import { Opportunity, TrackedApplication, ApplicationStatus, UserProfile, ChatMessage } from '@/types';
import { demoOpportunities, defaultProfile } from '@/constants/demoData';

type StorageGet = (key: string) => Promise<string | null>;
type StorageSet = (key: string, value: string) => Promise<void>;

const memoryStore = new Map<string, string>();
const memoryGet: StorageGet = async (key) => memoryStore.get(key) ?? null;
const memorySet: StorageSet = async (key, value) => { memoryStore.set(key, value); };

let secureGet: StorageGet = memoryGet;
let secureSet: StorageSet = memorySet;

if (Platform.OS !== 'web') {
  try {
    const SecureStore = require('expo-secure-store');
    secureGet = SecureStore.getItemAsync as StorageGet;
    secureSet = SecureStore.setItemAsync as StorageSet;
  } catch {
    // fall back to memory store
  }
}

async function loadJSON<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await secureGet(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {
    // ignore
  }
  return fallback;
}

async function saveJSON(key: string, value: unknown): Promise<void> {
  try {
    await secureSet(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

interface AppContextValue {
  opportunities: Opportunity[];
  savedIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
  removeSaved: (id: string) => void;
  applications: TrackedApplication[];
  addApplication: (opp: Opportunity, status: ApplicationStatus) => void;
  updateApplicationStatus: (id: string, status: ApplicationStatus) => void;
  removeApplication: (id: string) => void;
  getApplicationForOpportunity: (oppId: string) => TrackedApplication | undefined;
  profile: UserProfile;
  updateProfile: (profile: UserProfile) => void;
  chatHistory: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  clearChat: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const STORAGE_KEYS = {
  saved: 'nexora_saved',
  applications: 'nexora_applications',
  profile: 'nexora_profile',
  chat: 'nexora_chat',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [applications, setApplications] = useState<TrackedApplication[]>([]);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const [saved, apps, prof, chat] = await Promise.all([
        loadJSON<string[]>(STORAGE_KEYS.saved, []),
        loadJSON<TrackedApplication[]>(STORAGE_KEYS.applications, []),
        loadJSON<UserProfile>(STORAGE_KEYS.profile, defaultProfile),
        loadJSON<ChatMessage[]>(STORAGE_KEYS.chat, []),
      ]);
      setSavedIds(saved);
      setApplications(apps);
      setProfile(prof);
      setChatHistory(chat);
      setLoaded(true);
    })();
  }, []);

  const toggleSave = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id];
      saveJSON(STORAGE_KEYS.saved, next);
      return next;
    });
  }, []);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const removeSaved = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = prev.filter((s) => s !== id);
      saveJSON(STORAGE_KEYS.saved, next);
      return next;
    });
  }, []);

  const addApplication = useCallback((opp: Opportunity, status: ApplicationStatus) => {
    setApplications((prev) => {
      const existing = prev.find((a) => a.opportunityId === opp.id);
      if (existing) {
        const updated = prev.map((a) =>
          a.opportunityId === opp.id ? { ...a, status } : a
        );
        saveJSON(STORAGE_KEYS.applications, updated);
        return updated;
      }
      const newApp: TrackedApplication = {
        id: `app-${Date.now()}`,
        opportunityId: opp.id,
        title: opp.title,
        organisation: opp.organisation,
        category: opp.category,
        location: opp.location,
        closingDate: opp.closingDate,
        status,
        addedAt: new Date().toISOString(),
      };
      const updated = [...prev, newApp];
      saveJSON(STORAGE_KEYS.applications, updated);
      return updated;
    });
  }, []);

  const updateApplicationStatus = useCallback((id: string, status: ApplicationStatus) => {
    setApplications((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, status } : a));
      saveJSON(STORAGE_KEYS.applications, updated);
      return updated;
    });
  }, []);

  const removeApplication = useCallback((id: string) => {
    setApplications((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      saveJSON(STORAGE_KEYS.applications, updated);
      return updated;
    });
  }, []);

  const getApplicationForOpportunity = useCallback(
    (oppId: string) => applications.find((a) => a.opportunityId === oppId),
    [applications]
  );

  const updateProfile = useCallback((newProfile: UserProfile) => {
    setProfile(newProfile);
    saveJSON(STORAGE_KEYS.profile, newProfile);
  }, []);

  const addChatMessage = useCallback((message: ChatMessage) => {
    setChatHistory((prev) => {
      const updated = [...prev, message];
      saveJSON(STORAGE_KEYS.chat, updated);
      return updated;
    });
  }, []);

  const clearChat = useCallback(() => {
    setChatHistory([]);
    saveJSON(STORAGE_KEYS.chat, []);
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        opportunities: demoOpportunities,
        savedIds,
        toggleSave,
        isSaved,
        removeSaved,
        applications,
        addApplication,
        updateApplicationStatus,
        removeApplication,
        getApplicationForOpportunity,
        profile,
        updateProfile,
        chatHistory,
        addChatMessage,
        clearChat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
