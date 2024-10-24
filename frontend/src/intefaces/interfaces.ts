export interface UserI {
  username: string;
  firstName: string;
  lastName: string;
};

export interface ErrorsI {
  username: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
};
