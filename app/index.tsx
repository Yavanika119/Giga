import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useUIEngine } from '../src/context/UIEngineContext';

export default function Home() {
  const router = useRouter();
  const { ui } = useUIEngine();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ui?.colors?.background || '#0A0F20',
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 26,
          color: ui?.colors?.text || '#FFF',
          fontFamily: ui?.fonts?.primary || 'System',
          marginBottom: 20,
        }}
      >
        Welcome to Giga Platform
      </Text>

      <Text
        style={{
          color: ui?.colors?.textSecondary || '#AAA',
          fontSize: 16,
          textAlign: 'center',
          marginBottom: 30,
        }}
      >
        A dynamic UI powered by your backend configuration.
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: ui?.colors?.primary || '#5AAFFF',
          borderRadius: 8,
          paddingVertical: 12,
          paddingHorizontal: 24,
        }}
        onPress={() => router.push('/login')}
      >
        <Text
          style={{
            color: ui?.colors?.buttonText || '#000',
            fontWeight: '600',
            fontSize: 16,
          }}
        >
          Go to Login
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
