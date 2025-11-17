import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useAuth } from '../../src/hooks/useAuth';
import { useUIEngine } from '../../src/context/UIEngineContext';
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const { state, refreshProfile, logout } = useAuth();
  const { ui, loading } = useUIEngine();
  const router = useRouter();

  useEffect(() => {
    refreshProfile();
  }, []);

  if (loading || !state.user) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: ui.colors.background }}>
        <ActivityIndicator color={ui.colors.primary} size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: ui.colors.background, padding: 20 }}>
      <Text style={{ color: ui.colors.text, fontSize: 24, fontWeight: 'bold' }}>
        Welcome, {state.user.firstName || state.user.username}
      </Text>
      <Text style={{ color: ui.colors.textSecondary, marginTop: 8 }}>
        Email: {state.user.email}
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: ui.colors.primary,
          borderRadius: 8,
          padding: 12,
          marginTop: 30,
          alignItems: 'center',
        }}
        onPress={logout}
      >
        <Text style={{ color: '#000', fontWeight: '600' }}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
