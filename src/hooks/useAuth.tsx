import React, { createContext, useContext, useEffect, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { API_URL } from '../config/appConfig';
import * as WebBrowser from 'expo-web-browser';
import startAsync from 'expo-auth-session';
import { makeRedirectUri } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext<any>(null);

const initialState = { user: null, token: null, isAuthenticated: false };

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, ...action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const login = async () => {
  const redirectUri = makeRedirectUri({
    url: `${API_URL}/auth/callback`,
    useProxy: true,
});

    // 1️⃣ Ask backend for the Keycloak authorization URL
    const { data } = await axios.get(`${API_URL}/auth/login`, {
      params: { redirect_uri: redirectUri },
    });

    // 2️⃣ Start PKCE auth session (browser)
    const result = await startAsync({ authUrl: data.authUrl });

    if (result.type === 'success' && result.params.code) {
      // 3️⃣ Exchange code with your backend → tokens
      const tokenRes = await axios.post(`${API_URL}/auth/callback`, {
        code: result.params.code,
        redirect_uri: redirectUri,
      });

      const { token, user } = tokenRes.data;

      await SecureStore.setItemAsync('token', token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('token');
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        try {
          const { data } = await axios.get(`${API_URL}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user: data } });
        } catch {
          await SecureStore.deleteItemAsync('token');
        }
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
