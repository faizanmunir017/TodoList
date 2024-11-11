export const USER_REGISTER_STARTED = "USER_REGISTER_STARTED";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILED = "USER_REGISTER_FAILED";

export interface User {
  email: string;
  password: string;
}

export const registerUser = (user: User) => ({
  type: USER_REGISTER_STARTED,
  payload: user,
});
