export interface ApiResponse {
  isSuccess?: boolean;
  errorCode?: string | null;
  statusCode?: number;
  message?: string | null;
  devMessage?: string | null;
  exceptionStackTrace?: string | null;
}

export interface ChangePasswordRequestDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequestDto {
  email: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
  twoFactorCode?: string | null;
}

export interface RefreshTokenRequestDto {
  accessToken: string;
  refreshToken: string;
}

export interface ResetPasswordRequestDto {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface RoleDto {
  id?: string;
  name?: string | null;
  description?: string | null;
  isEditable?: boolean;
  createdAt?: string;
  updatedAt?: string;
  participantType?: number;
}

export interface RoleDtoListApiResponse {
  isSuccess?: boolean;
  errorCode?: string | null;
  statusCode?: number;
  message?: string | null;
  devMessage?: string | null;
  exceptionStackTrace?: string | null;
  data?: RoleDto[] | null;
}

export interface StringApiResponse {
  isSuccess?: boolean;
  errorCode?: string | null;
  statusCode?: number;
  message?: string | null;
  devMessage?: string | null;
  exceptionStackTrace?: string | null;
  data?: string | null;
}

export interface UpdateUserRequestDto {
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  phoneNumber?: string | null;
  gender?: string | null;
  address?: string | null;
  state?: string | null;
  country?: string | null;
  designation?: string | null;
  profilePictureKey?: string | null;
}

export interface UpdateUserRoleRequestDto {
  roleName: string;
}

export interface UserDto {
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  gender?: string | null;
  isActive?: boolean;
  isProfileCompleted?: boolean;
  emailConfirmed?: boolean;
  phoneNumberConfirmed?: boolean;
  twoFactorEnabled?: boolean;
  address?: string | null;
  state?: string | null;
  country?: string | null;
  designation?: string | null;
  profilePictureKey?: string | null;
  profilePictureUrl?: string | null;
  createdOn?: string | null;
  updatedOn?: string | null;
  lastLoginDate?: string | null;
  roles?: string[] | null;
}

export interface UserDtoApiResponse {
  isSuccess?: boolean;
  errorCode?: string | null;
  statusCode?: number;
  message?: string | null;
  devMessage?: string | null;
  exceptionStackTrace?: string | null;
  data?: UserDto;
}

export interface UserDtoListApiResponse {
  isSuccess?: boolean;
  errorCode?: string | null;
  statusCode?: number;
  message?: string | null;
  devMessage?: string | null;
  exceptionStackTrace?: string | null;
  data?: UserDto[] | null;
}
