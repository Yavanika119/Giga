import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme } from '../types';

const lightTheme: Theme = {
  name: 'light',
  background: '#F5F5F5',
  text: '#000',
  card: '#FFF',
  border: '#CCC',
};

const darkTheme: Theme = {
  name: 'dark',
  background: '#0A0F20',
  text: '#FFF',
  card: 'rgba(30, 35, 55, 0.7)',
  border: 'rgba(255, 255, 255, 0.1)',
};

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(darkTheme);

  const toggleTheme = () => {
    setTheme(prev => prev.name === 'dark' ? lightTheme : darkTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};