import axios from 'axios';
import { LoginCredentials, RegisterData } from '../types';

// Replace with your actual backend API URL
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Server responded with error status
        throw new Error(error.response.data.message || 'Login failed');
      } else if (error.request) {
        // Request made but no response received
        throw new Error('Network error: Please check your connection');
      } else {
        // Other error
        throw new Error('An unexpected error occurred');
      }
    }
  },

  register: async (data: RegisterData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Server responded with error status
        throw new Error(error.response.data.message || 'Registration failed');
      } else if (error.request) {
        // Request made but no response received
        throw new Error('Network error: Please check your connection');
      } else {
        // Other error
        throw new Error('An unexpected error occurred');
      }
    }
  },

  logout: async (token: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Logout failed');
    }
  },

  // Optional: Verify token validity
  verifyToken: async (token: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Token verification failed');
    }
  }
};