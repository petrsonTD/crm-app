export interface AuthTokenI {
  sessionId: string;
  userId: string;
  userRankId: string;
}

export interface RegisterErrorsI {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  psc?: string;
  city?: string;
}

export interface UserWithDetailsI {
  id: number;
  username: string;
  password?: string;
  userRank: string;
  lastName: string;
  firstName: string;
}

export interface PasswordI {
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
};
