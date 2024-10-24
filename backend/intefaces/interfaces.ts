export interface AuthTokenI {
  sessionId: string;
  userId: string;
}

export interface RegisterErrorsI {
  username?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
}

export interface UserWithDetailsI {
  id: number;
  username: string;
  password?: string;
  userRank: string;
  lastName: string;
  firstName: string;
}
