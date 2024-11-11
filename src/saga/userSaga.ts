import { takeEvery, call, put, select, Effect } from "redux-saga/effects";
import axios from "axios";
import {
  USER_REGISTER_STARTED,
  USER_REGISTER_FAILED,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGIN_STARTED,
  USER_LOGIN_SUCCESS,
} from "State/userActions";

const BASE_URL = import.meta.env.VITE_TASK_APP_API_URL;

function* registerUser(action: any): Generator<Effect, void, any> {
  try {
    yield call(axios.post, `${BASE_URL}/api/register`, action.payload);
    yield put({ type: USER_REGISTER_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: USER_REGISTER_FAILED, error });
  }
}

function* loginUser(action: any): Generator<Effect, void, any> {
  try {
    yield call(axios.post, `${BASE_URL}/api/login`, action.payload);
  } catch (error) {
    yield put({ type: USER_LOGIN_FAILED, error });
  }
}

export default function* userSaga() {
  yield takeEvery(USER_REGISTER_STARTED, registerUser);
  yield takeEvery(USER_LOGIN_STARTED, loginUser);
}
