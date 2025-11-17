import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import * as Font from 'expo-font';

type UIConfig = {
  colors: Record<string, string>;
  fonts?: Record<string, string>;
  components?: Record<string, any>;
};

type UIEngineContextType = {
  ui: UIConfig;
  loading: boolean;
  refreshUI: () => Promise<void>;
};

const defaultUI: UIConfig = {
  colors: {
    background: '#0A0F20',
    text: '#FFFFFF',
    primary: '#5AAFFF',
    accent: '#FFD700'
  },
  fonts: {
    primary: 'System'
  },
};

const UIEngineContext = createContext<UIEngineContextType>({
  ui: defaultUI,
  loading: true,
  refreshUI: async () => {},
});

export const UIEngineProvider = ({ children }: { children: ReactNode }) => {
  const [ui, setUI] = useState<UIConfig>(defaultUI);
  const [loading, setLoading] = useState(true);

  const loadUIConfig = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api');
      const config = res.data;

      // Load remote fonts if any
      if (config.fonts) {
        const fontPromises = Object.entries(config.fonts).map(async ([name, url]) => {
  await Font.loadAsync({ [name]: { uri: String(url) } as Font.FontSource });
});

        await Promise.all(fontPromises);
      }

      setUI({ ...defaultUI, ...config });
    } catch (error) {
      console.warn('Failed to load UI config, using defaults');
      setUI(defaultUI);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUIConfig();
  }, []);

  return (
    <UIEngineContext.Provider value={{ ui, loading, refreshUI: loadUIConfig }}>
      {children}
    </UIEngineContext.Provider>
  );
};

export const useUIEngine = () => useContext(UIEngineContext);
