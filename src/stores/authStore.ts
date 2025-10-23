import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { authService, User } from '../api/AuthService';

// Types
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: 'teacher' | 'student') => Promise<void>;
  googleLogin: (googleToken: string, role: 'teacher' | 'student') => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  initializeAuth: () => void;
}

// Factory Pattern: Create Auth Store
const createAuthStore = () => {
  return create<AuthState & AuthActions>()(
    devtools(
      persist(
        (set, get) => ({
          // Initial State
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,

          // Actions
          login: async (email: string, password: string) => {
            set({ isLoading: true, error: null });
            
            try {
              const authData = await authService.login({ email, password });
              set({
                user: authData.user,
                isAuthenticated: true,
                isLoading: false,
                error: null
              });
            } catch (error) {
              set({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Login failed'
              });
              throw error;
            }
          },

          register: async (email: string, password: string, name: string, role: 'teacher' | 'student') => {
            set({ isLoading: true, error: null });
            
            try {
              const authData = await authService.register({ email, password, name, role });
              set({
                user: authData.user,
                isAuthenticated: true,
                isLoading: false,
                error: null
              });
            } catch (error) {
              set({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Registration failed'
              });
              throw error;
            }
          },

          googleLogin: async (googleToken: string, role: 'teacher' | 'student') => {
            set({ isLoading: true, error: null });
            
            try {
              const authData = await authService.googleLogin({ google_token: googleToken, role });
              set({
                user: authData.user,
                isAuthenticated: true,
                isLoading: false,
                error: null
              });
            } catch (error) {
              set({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Google login failed'
              });
              throw error;
            }
          },

          logout: async () => {
            set({ isLoading: true });
            
            try {
              await authService.logout();
              set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null
              });
            } catch (error) {
              // Even if logout fails, clear local state
              set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null
              });
            }
          },

          clearError: () => {
            set({ error: null });
          },

          initializeAuth: () => {
            const isAuth = authService.isAuthenticated();
            const storedUser = authService.getStoredUser();
            
            if (isAuth && storedUser) {
              set({
                user: storedUser,
                isAuthenticated: true,
                isLoading: false,
                error: null
              });
            } else {
              set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null
              });
            }
          }
        }),
        {
          name: 'ludix-auth-storage',
          partialize: (state) => ({
            user: state.user,
            isAuthenticated: state.isAuthenticated
          }),
        }
      ),
      { name: 'auth-store' }
    )
  );
};

// Singleton Pattern: Export store instance
export const useAuthStore = createAuthStore();
