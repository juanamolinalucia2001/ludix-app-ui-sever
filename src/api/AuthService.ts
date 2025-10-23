import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_CONFIG, REQUEST_TIMEOUT, DEFAULT_HEADERS } from './config';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'teacher' | 'student';
  avatar_url?: string;
  class_id?: string;
  created_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: 'teacher' | 'student';
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
  expires_in: number;
}

export interface GoogleAuthRequest {
  google_token: string;
  role: 'teacher' | 'student';
}

// Singleton Pattern: API Client Instance
class APIClient {
  private static instance: APIClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: REQUEST_TIMEOUT,
      headers: DEFAULT_HEADERS,
    });

    this.setupInterceptors();
  }

  public static getInstance(): APIClient {
    if (!APIClient.instance) {
      APIClient.instance = new APIClient();
    }
    return APIClient.instance;
  }

  private setupInterceptors(): void {
    // Request interceptor - add auth token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - handle token refresh
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && originalRequest) {
          try {
            await this.refreshToken();
            const token = localStorage.getItem('access_token');
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            this.clearTokens();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  private async refreshToken(): Promise<void> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) throw new Error('No refresh token');

    const response = await this.axiosInstance.post(API_CONFIG.ENDPOINTS.AUTH.REFRESH, {
      refresh_token: refreshToken
    });

    const { access_token, refresh_token: newRefreshToken } = response.data;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', newRefreshToken);
  }

  private clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

// Decorator Pattern: Auth Service with logging
class AuthService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = APIClient.getInstance().getAxiosInstance();
  }

  // Decorator: Log method calls
  private logApiCall = (method: string, endpoint: string) => {
    console.log(`[AuthService] ${method.toUpperCase()} ${endpoint}`);
  };

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    this.logApiCall('post', API_CONFIG.ENDPOINTS.AUTH.LOGIN);
    
    try {
      const response = await this.apiClient.post<AuthResponse>(
        API_CONFIG.ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      
      this.storeTokens(response.data);
      return response.data;
    } catch (error) {
      console.error('[AuthService] Login failed:', error);
      throw error;
    }
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    this.logApiCall('post', API_CONFIG.ENDPOINTS.AUTH.REGISTER);
    
    try {
      const response = await this.apiClient.post<AuthResponse>(
        API_CONFIG.ENDPOINTS.AUTH.REGISTER,
        userData
      );
      
      this.storeTokens(response.data);
      return response.data;
    } catch (error) {
      console.error('[AuthService] Registration failed:', error);
      throw error;
    }
  }

  async googleLogin(googleData: GoogleAuthRequest): Promise<AuthResponse> {
    this.logApiCall('post', API_CONFIG.ENDPOINTS.AUTH.GOOGLE_LOGIN);
    
    try {
      const response = await this.apiClient.post<AuthResponse>(
        API_CONFIG.ENDPOINTS.AUTH.GOOGLE_LOGIN,
        googleData
      );
      
      this.storeTokens(response.data);
      return response.data;
    } catch (error) {
      console.error('[AuthService] Google login failed:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    this.logApiCall('post', API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    
    try {
      await this.apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('[AuthService] Logout failed:', error);
    } finally {
      this.clearTokens();
    }
  }

  async getCurrentUser(): Promise<User> {
    this.logApiCall('get', API_CONFIG.ENDPOINTS.USERS.PROFILE);
    
    const response = await this.apiClient.get<User>(
      API_CONFIG.ENDPOINTS.USERS.PROFILE
    );
    return response.data;
  }

  private storeTokens(authData: AuthResponse): void {
    localStorage.setItem('access_token', authData.access_token);
    localStorage.setItem('refresh_token', authData.refresh_token);
    localStorage.setItem('user', JSON.stringify(authData.user));
  }

  private clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}

// Export singleton instance
export const authService = new AuthService();
