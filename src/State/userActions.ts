export const USER_REGISTER_STARTED = "USER_REGISTER_STARTED";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILED = "USER_REGISTER_FAILED";

export const USER_LOGIN_STARTED = "USER_LOGIN_STARTED";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";

export interface User {
  _id?: string;
  email: string;
  password: string;
  isAuthenticated?: boolean;
}

export const registerUser = (user: User) => ({
  type: USER_REGISTER_STARTED,
  payload: user,
});

export const loginUser = (user: User) => ({
  type: USER_LOGIN_STARTED,
  payload: user,
});
