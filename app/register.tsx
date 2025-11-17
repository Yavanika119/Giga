import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { useUIEngine } from '../src/context/UIEngineContext';
import getLoginStyles from '../src/styles/styles'; // same shared styles

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000'; // update to your backend URL

export default function Register() {
  const { ui, loading } = useUIEngine();
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
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

  const handleRegister = async () => {
    if (!form.username || !form.password || !form.email) {
      Alert.alert('Missing Fields', 'Please fill all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await axios.post(`${API_URL}/auth/sync-user`, form);
      if (res.status === 201) {
        Alert.alert('Success', 'Registration successful. Please log in.');
        router.replace('/login');
      }
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      Alert.alert('Registration Failed', err.response?.data?.error || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Fill the details below to register</Text>

        <TextInput
          placeholder="First Name"
          placeholderTextColor="#888"
          style={styles.input}
          value={form.firstName}
          onChangeText={(t) => setForm({ ...form, firstName: t })}
        />

        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#888"
          style={styles.input}
          value={form.lastName}
          onChangeText={(t) => setForm({ ...form, lastName: t })}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#888"
          style={styles.input}
          keyboardType="email-address"
          value={form.email}
          onChangeText={(t) => setForm({ ...form, email: t })}
        />

        <TextInput
          placeholder="Username"
          placeholderTextColor="#888"
          style={styles.input}
          value={form.username}
          onChangeText={(t) => setForm({ ...form, username: t })}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          style={styles.input}
          secureTextEntry
          value={form.password}
          onChangeText={(t) => setForm({ ...form, password: t })}
        />

        <TouchableOpacity
          disabled={submitting}
          onPress={handleRegister}
          style={[styles.loginButton, submitting && styles.disabledButton]}
        >
          <Text style={styles.buttonText}>
            {submitting ? 'Registering...' : 'Register'}
          </Text>
        </TouchableOpacity>

        {/* Back to Login */}
        <TouchableOpacity onPress={() => router.replace('/login')} style={styles.linkButton}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
