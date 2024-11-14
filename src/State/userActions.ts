import { USER_REGISTER, USER_LOGIN, USER_LOGOUT } from "State/userActionTypes";

export interface User {
  _id?: string;
  email: string;
  password: string;
  isAuthenticated?: boolean;
}

export const registerUser = {
  STARTED: (user: User) => ({
    type: USER_REGISTER.STARTED,
    payload: user,
  }),
};

export const loginUser = {
  STARTED: (user: User) => ({
    type: USER_LOGIN.STARTED,
    payload: user,
  }),
};

export const logoutUser = {
  STARTED: () => ({
    type: USER_LOGOUT.STARTED,
  }),
};
