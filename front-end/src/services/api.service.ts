import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/lib/constants';
import { AuthTokens } from '@/types';

// -------------------------
// Axios instances
// -------------------------
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiClientUpload = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// -------------------------
// Token management
// -------------------------
export const tokenManager = {
  setTokens(tokens: AuthTokens) {
    if (typeof window === "undefined") return;
    localStorage.setItem("access_token", tokens.accessToken);
    localStorage.setItem("refresh_token", tokens.refreshToken);
  },

  getAccessToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
  },

  getRefreshToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("refresh_token");
  },

  clear() {
    if (typeof window === "undefined") return;
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
};

// -------------------------
// Refresh queue
// -------------------------
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (reason: AxiosError) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((p) => {
    error ? p.reject(error) : p.resolve(token!);
  });
  failedQueue = [];
};

// -------------------------
// Inject accessToken
// -------------------------
const injectAuthToken = (config: InternalAxiosRequestConfig) => {
  const token = tokenManager.getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

apiClient.interceptors.request.use((config) => {
  const token = tokenManager.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.withCredentials = true; // 🔥 OBLIGATOIRE
  return config;
});
apiClientUpload.interceptors.request.use((config) => {
  const token = tokenManager.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.withCredentials = true; // 🔥
  return config;
});

// -------------------------
// Refresh Token
// -------------------------
async function refreshAccessToken(refreshToken: string): Promise<AuthTokens> {
  const { data } = await axios.post(`${API_BASE_URL}/users/refresh-token`, {
    refreshToken,
  });

  return data;
}

// -------------------------
// Response interceptor
// -------------------------
apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = tokenManager.getRefreshToken();
      if (!refreshToken) {
        tokenManager.clear();
        if (typeof window !== "undefined") window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((newToken) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }
          return apiClient(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const newTokens = await refreshAccessToken(refreshToken);
        tokenManager.setTokens(newTokens);

        processQueue(null, newTokens.accessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        }

        return apiClient(originalRequest);
      } catch (err) {
        processQueue(err as AxiosError, null);
        tokenManager.clear();
        if (typeof window !== "undefined") window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
