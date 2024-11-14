import { all } from "redux-saga/effects";
import taskSaga from "saga/taskSaga";
import userSaga from "saga/userSaga";

export default function* rootSaga() {
  yield all([taskSaga(), userSaga()]);
}
