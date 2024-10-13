export interface AuthTokenI {
  sessionId: string;
  userId: string;
}

export interface SingUpErrorsI {
  username?: string;
  password?: string;
  confirmPassword?: string;
}