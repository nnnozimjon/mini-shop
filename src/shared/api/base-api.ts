import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { store } from "@app/store";
import { refreshAccessToken, logout, type AuthState } from "@entities/user";
import { showError, showSuccess } from "@shared/lib";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
  showSuccessToast?: boolean;
}

const baseApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

baseApi.interceptors.request.use(
  (config: any) => {
    const state: { auth: AuthState } = store.getState();
    const accessToken = state.auth.accessToken;

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

baseApi.interceptors.response.use(
  (response: AxiosResponse) => {
    const showSuccessToast = response.data.showSuccessToast

    if (showSuccessToast && response.data?.message) {
      showSuccess(response.data.message || (response as any).message);
    }

    return response;
  },
  async (error: AxiosError & { config?: CustomAxiosRequestConfig }) => {
    const originalRequest = error.config;
    const errorResponseData = error.response?.data as any;

    const errorMessage = errorResponseData?.message
      ? Array.isArray(errorResponseData.message)
        ? errorResponseData.message[0]
        : errorResponseData.message
      : error.message || "Something went wrong";

    const isUnauthorized = error.response?.status === 401;

    if (isUnauthorized && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      const state: { auth: AuthState } = store.getState();
      const refreshToken = state.auth.refreshToken;

      if (!refreshToken) {
        store.dispatch(logout());
        showError("Session expired. Please login again.");
        return Promise.reject(error);
      }

      try {
        await store.dispatch(refreshAccessToken()).unwrap();

        const newState: { auth: AuthState } = store.getState();
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newState.auth.accessToken}`;
        }

        return baseApi(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        showError("Session expired. Please login again.");
        return Promise.reject(refreshError);
      }
    }
    showError(errorMessage);
    return Promise.reject(error);
  }
);

export const api = {
  get: <T>(url: string, config?: CustomAxiosRequestConfig) =>
    baseApi.get<T>(url, config),

  post: <T>(url: string, data?: any, config?: CustomAxiosRequestConfig) =>
    baseApi.post<T>(url, data, config),

  put: <T>(url: string, data?: any, config?: CustomAxiosRequestConfig) =>
    baseApi.put<T>(url, data, config),

  patch: <T>(url: string, data?: any, config?: CustomAxiosRequestConfig) =>
    baseApi.patch<T>(url, data, config),

  delete: <T>(url: string, config?: CustomAxiosRequestConfig) =>
    baseApi.delete<T>(url, config),
};

export default baseApi;
