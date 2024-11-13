import { User } from "./userActions";

interface userState {
  user: User | null;
  token: string | null;
}

const initialState: userState = {
  user: null,
  token: null,
};

export const userReducer = (state = initialState, action: any): userState => {
  switch (action.type) {
    case "USER_REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
      };

    case "USER_LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "USER_LOGOUT_SUCCESS":
      return {
        ...state,
        user: { ...action.payload.user },
        token: action.payload.token,
      };

    default:
      return state;
  }
};
