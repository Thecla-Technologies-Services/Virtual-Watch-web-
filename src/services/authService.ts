import { apiClient } from "./api/client";
import type {
  LoginRequestDto,
  ChangePasswordRequestDto,
  ForgotPasswordRequestDto,
  ResetPasswordRequestDto,
  RefreshTokenRequestDto,
  ApiResponse,
  RoleDtoListApiResponse,
} from "./api/types";

export const authService = {
  login: (data: LoginRequestDto) =>
    apiClient<ApiResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  changePassword: (data: ChangePasswordRequestDto) =>
    apiClient<ApiResponse>("/api/auth/change-password", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  forgotPassword: (data: ForgotPasswordRequestDto) =>
    apiClient<ApiResponse>("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  resetPassword: (data: ResetPasswordRequestDto) =>
    apiClient<ApiResponse>("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  refreshToken: (data: RefreshTokenRequestDto) =>
    apiClient<ApiResponse>("/api/auth/refresh-token", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  logout: () =>
    apiClient<ApiResponse>("/api/auth/logout", {
      method: "POST",
    }),

  getRoles: () =>
    apiClient<RoleDtoListApiResponse>("/api/auth/roles", {
      method: "GET",
    }),
};
