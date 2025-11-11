import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/hooks/useAuth';
import { useTheme } from '../../src/hooks/useTheme';
import { User } from '../../src/types';

const Home = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Replace with actual API call
      const response = await fetch('/api/users'); // Placeholder
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => logout() }
      ]
    );
  };

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.userCard}>
      <Text style={styles.userName}>{item.username}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Welcome, {user?.username}!
        </Text>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
          <Text style={styles.themeButtonText}>
            {theme.name === 'dark' ? 'Light' : 'Dark'} Theme
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: theme.text }]}>
              {loading ? 'Loading...' : 'No users found'}
            </Text>
          }
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.usersButton} 
          onPress={() => router.push('/(admin)/users')}
        >
          <Text style={styles.usersButtonText}>Manage Users</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    ...Platform.select({
      android: {
        paddingTop: 25,
      }
    })
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  themeButton: {
    backgroundColor: '#5AAFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  themeButtonText: {
    color: '#000',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  userCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  userEmail: {
    fontSize: 14,
    color: '#AAA',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  logoutButton: {
    backgroundColor: '#FF4444',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  usersButton: {
    backgroundColor: '#5AAFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  usersButtonText: {
    color: '#000',
    fontWeight: '600',
  },
});

export default Home;