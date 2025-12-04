import { User } from './user.types';

// Re-export user types
export * from './user.types';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}


export interface LoginCredentials {
  email: string;
  password: string;
}


export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}
