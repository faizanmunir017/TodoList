import { User } from "./userActions";

interface userState {
  user: User | null;
}

const initialState: userState = {
  user: null,
};

export const userReducer = (state = initialState, action: any): userState => {
  switch (action.type) {
    case "USER_REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };

    case "USER_LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
