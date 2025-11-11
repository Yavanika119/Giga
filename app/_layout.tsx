import React from 'react';
import { AuthProvider } from '../src/hooks/useAuth';

export default function RootLayout() {
  return (
    <AuthProvider>
      {/* Your app content */}
    </AuthProvider>
  );
}