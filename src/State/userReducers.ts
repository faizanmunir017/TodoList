import { User } from "./userActions";

interface userState {
  user: User[];
}

//setting up initial user State
const initialState: userState = {
  user: [],
};

export const userReducer = (state = initialState, action: any): userState => {
  switch (action.type) {
    case "USER_REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
