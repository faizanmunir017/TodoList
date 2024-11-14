import { User } from "State/userActions";

interface userState {
  user: User | null;
  token: string | null;
}
import { USER_REGISTER, USER_LOGIN, USER_LOGOUT } from "State/userActionTypes";

const initialState: userState = {
  user: null,
  token: null,
};

export const userReducer = (state = initialState, action: any): userState => {
  switch (action.type) {
    case USER_REGISTER.SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };

    case USER_LOGIN.SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case USER_LOGOUT.SUCCESS:
      return {
        ...state,
        user: { ...action.payload.user },
        token: action.payload.token,
      };

    default:
      return state;
  }
};
