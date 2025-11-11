import { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, LoginCredentials, RegisterData } from '../types';
import { authApi } from '../api/authApi';
import { tokenService } from '../auth/tokenService';

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: { user: any; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const AuthContext = createContext<{
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: ( RegisterData) => Promise<void>;
  logout: () => void;
} | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return initialState;
    case 'SET_LOADING':
      return state;
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Initialize auth state from storage
    const initializeAuth = async () => {
      const token = await tokenService.getToken();
      if (token) {
        try {
          // Verify token and set user
          const user = await tokenService.getUser();
          if (user) {
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: { user, token }
            });
          }
        } catch (error) {
          // Token verification failed, clear stored data
          await tokenService.clearToken();
        }
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authApi.login(credentials);
      const { user, token } = response;
      
      await tokenService.setToken(token);
      await tokenService.setUser(user);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token }
      });
    } catch (error: any) {
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await authApi.register(data);
      return response;
    } catch (error: any) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (state.token) {
        await authApi.logout(state.token);
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      await tokenService.clearToken();
      dispatch({ type: 'LOGOUT' });
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};