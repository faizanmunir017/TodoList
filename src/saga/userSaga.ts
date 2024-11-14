import { takeEvery, call, put, select, Effect } from "redux-saga/effects";
import axios from "axios";
import { USER_REGISTER, USER_LOGIN, USER_LOGOUT } from "State/userActionTypes";

const BASE_URL = import.meta.env.VITE_TASK_APP_API_URL;

const selectUsers = (state: any) => state.user.user;

function* registerUser(action: any): Generator<Effect, void, any> {
  try {
    yield call(axios.post, `${BASE_URL}/api/register`, action.payload);
    yield put({ type: USER_REGISTER.SUCCESS, payload: action.payload });
  } catch (error) {
    console.error("Registeration failed: ", error);
    yield put({ type: USER_REGISTER.FAILED, error });
  }
}

function* loginUser(action: any): Generator<Effect, void, any> {
  try {
    const response = yield call(
      axios.post,
      `${BASE_URL}/api/login`,
      action.payload
    );

    const { token, user } = response.data;

    yield put({
      type: USER_LOGIN.SUCCESS,
      payload: { user: { ...user, isAuthenticated: true }, token },
    });
  } catch (error) {
    console.log("Login Failed :", error);
    yield put({ type: USER_LOGIN.FAILED, error });
  }
}

function* logoutUser(): Generator {
  try {
    const currentUser = yield select(selectUsers);

    yield put({
      type: USER_LOGOUT.SUCCESS,
      payload: {
        user: {
          ...currentUser,
          isAuthenticated: false,
        },
        token: null,
      },
    });
  } catch (error) {
    console.log("Logout Failed:   ", error);
    yield put({ type: USER_LOGOUT.FAILED, error });
  }
}

export default function* userSaga() {
  yield takeEvery(USER_REGISTER.STARTED, registerUser);
  yield takeEvery(USER_LOGIN.STARTED, loginUser);
  yield takeEvery(USER_LOGOUT.STARTED, logoutUser);
}
