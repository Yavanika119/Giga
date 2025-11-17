import { Stack } from 'expo-router';
import { AuthProvider } from '../src/hooks/useAuth';
import { UIEngineProvider } from '../src/context/UIEngineContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <UIEngineProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </UIEngineProvider>
    </AuthProvider>
  );
}
