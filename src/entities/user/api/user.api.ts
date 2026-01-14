import { api } from "@shared/api";
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  RegisterRequest,
} from "./user-api.types";

export const userApi = {
  login: (data: LoginRequest) => api.post<LoginResponse>("/auth/login", data),
  register: (data: RegisterRequest) =>
    api.post<RegisterRequest>("auth/register", data),
  refreshToken: (userId: string, refreshToken: string) =>
    api.post<RefreshTokenResponse>("/auth/refresh", { userId, refreshToken }),
  getMe: (userId: string) => api.get(`/users/${userId}`),
};
