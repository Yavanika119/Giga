import { useState } from 'react';

export const useDynamicTheme = () => {
  const [theme, setTheme] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTheme = async () => {
    try {
      const res = await fetch('https://your-backend-api.com/theme');
      const data = await res.json();
      setTheme(data);
    } catch (err) {
      console.error('Failed to load theme:', err);
      setTheme({});
    } finally {
      setLoading(false);
    }
  };

  return { theme, loading, fetchTheme };
};
