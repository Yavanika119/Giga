import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/hooks/useAuth';
import { useUIEngine } from '../src/context/UIEngineContext';
import getLoginStyles from '../src/styles/styles'; // ← import your styles file

export default function Login() {
  const { ui, loading } = useUIEngine();
  const { login } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const styles = getLoginStyles({
    backgroundColor: ui?.colors?.background,
    cardBackground: ui?.colors?.card,
    primaryColor: ui?.colors?.primary,
    titleColor: ui?.colors?.text,
    subtitleColor: ui?.colors?.textSecondary,
    buttonTextColor: ui?.colors?.buttonText,
    fontFamily: ui?.fonts?.primary,
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator color={ui?.colors?.primary || '#5AAFFF'} size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <TextInput
          placeholder="Username"
          placeholderTextColor="#888"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#0a0404ff"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          disabled={submitting}
          onPress={async () => {
            setSubmitting(true);
            try {
              await login({ username, password });
              router.replace('/(protected)/dashboard');
            } finally {
              setSubmitting(false);
            }
          }}
          style={[styles.loginButton, submitting && styles.disabledButton]}
        >
          <Text style={styles.buttonText}>{submitting ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>

        {/* Register Redirect */}
        <TouchableOpacity onPress={() => router.push('/register')} style={styles.linkButton}>
          <Text style={styles.linkText}>Don’t have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
