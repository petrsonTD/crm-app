export interface UserI {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
};

export interface UserDataI {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  street: string;
  psc: string;
  city: string;
};

export interface RegistrationErrorsI {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  psc?: string;
  city?: string;
};

export interface PasswordI {
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
};
