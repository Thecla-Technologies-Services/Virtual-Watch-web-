import { apiClient } from "./api/client";
import type {
  UpdateUserRequestDto,
  UpdateUserRoleRequestDto,
  UserDtoApiResponse,
  UserDtoListApiResponse,
  ApiResponse,
} from "./api/types";

export const userService = {
  getCurrentUser: () =>
    apiClient<UserDtoApiResponse>("/api/user/me", {
      method: "GET",
    }),

  updateCurrentUser: (data: UpdateUserRequestDto) =>
    apiClient<UserDtoApiResponse>("/api/user/me", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  getUserById: (userId: string) =>
    apiClient<UserDtoApiResponse>(`/api/user/${userId}`, {
      method: "GET",
    }),

  getAllUsers: () =>
    apiClient<UserDtoListApiResponse>("/api/user/get-all", {
      method: "GET",
    }),

  updateUser: (userId: string, data: UpdateUserRequestDto) =>
    apiClient<UserDtoApiResponse>(`/api/user/update-user/${userId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deactivateUser: (userId: string) =>
    apiClient<ApiResponse>("/api/user/deactivate", {
      method: "POST",
      params: { userId },
    }),

  reactivateUser: (userId: string) =>
    apiClient<ApiResponse>("/api/user/reactivate", {
      method: "POST",
      params: { userId },
    }),

  deleteUser: (userId: string) =>
    apiClient<ApiResponse>("/api/user/delete", {
      method: "POST",
      params: { userId },
    }),

  updateUserRole: (userId: string, data: UpdateUserRoleRequestDto) =>
    apiClient<ApiResponse>(`/api/user/update-role/${userId}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getProfilePicture: () =>
    apiClient<any>("/api/user/me/profile-picture", {
      method: "GET",
    }),

  updateProfilePicture: (userId: string, formData: FormData) =>
    apiClient<ApiResponse>(`/api/user/update-profile-picture/${userId}`, {
      method: "PUT",
      body: formData,
      // When sending FormData, we shouldn't set Content-Type so browser sets boundary automatically
      headers: {
        "Content-Type": "",
      },
    }),
};
