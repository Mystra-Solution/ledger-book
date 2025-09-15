'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_CONFIG } from '@/lib/constants';

interface AuthSettings {
  tenantId: string;
  bearerToken: string;
}

interface AuthContextType {
  settings: AuthSettings;
  updateSettings: (settings: AuthSettings) => void;
  getHeaders: () => Record<string, string>;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'ledger-auth-settings';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AuthSettings>({
    tenantId: API_CONFIG.DEFAULT_TENANT_ID,
    bearerToken: '',
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setSettings(parsed);
        } catch (error) {
          console.error('Failed to parse saved auth settings:', error);
        }
      }
    }
  }, []);

  const updateSettings = (newSettings: AuthSettings) => {
    setSettings(newSettings);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    }
  };

  const getHeaders = () => {
    const headers: Record<string, string> = {
      ...API_CONFIG.DEFAULT_HEADERS,
      'x-tenant-id': settings.tenantId,
    };

    if (settings.bearerToken) {
      headers['Authorization'] = `Bearer ${settings.bearerToken}`;
    }

    return headers;
  };

  const isConfigured = Boolean(settings.tenantId && settings.bearerToken);

  return (
    <AuthContext.Provider value={{ settings, updateSettings, getHeaders, isConfigured }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
