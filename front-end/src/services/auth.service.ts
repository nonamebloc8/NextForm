import { AuthResponse, AuthTokens, LoginCredentials, User } from '@/types';
import apiClient, { tokenManager } from './api.service';

export const authService = {
login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    '/users/login',
    credentials,
  );
  const tokens: AuthTokens = {
    accessToken: response.data.accessToken!,
    refreshToken: response.data.refreshToken!,
  };
  tokenManager.setTokens(tokens);

  return response.data;
},

  // register: async (
  //   data: LoginCredentials & { name?: string },
  // ): Promise<AuthResponse> => {
  //   const response = await apiClient.post<AuthResponse>('/auth/register', data);
  //   const { tokens } = response.data;
  //   tokenManager.setTokens(tokens);
  //   return response.data;
  // },

  // logout: async (): Promise<void> => {
  //   try {
  //     await apiClient.post('/auth/logout');
  //   } finally {
  //     tokenManager.clearTokens();
  //   }
  // },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },
};
