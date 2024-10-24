import { takeEvery, put, call } from "redux-saga/effects";
import {
  ADD_TASK,
  REMOVE_TASK,
  EDIT_TASK,
  TOGGLE_TASK_COMPLETION,
} from "../State/taskActions";
// function* simulateAsyncTask() {
//   return new Promise((resolve) => setTimeout(resolve, 1000));
// }

function* handleAddTask(action: any) {
  try {
    yield put({ type: "ADD_TASK_STARTED" });
    // yield call(simulateAsyncTask);
    yield put({ type: "ADD_TASK_SUCCESS", payload: action.payload });
  } catch (error) {
    yield put({ type: "ADD_TASK_FAILED", error });
  }
}

function* handleRemoveTask(action: any) {
  try {
    yield put({ type: "REMOVE_TASK_STARTED" });
    // yield call(simulateAsyncTask);
    yield put({ type: "REMOVE_TASK_SUCCESS", payload: action.payload });
  } catch (error) {
    yield put({ type: "REMOVE_TASK_FAILED", error });
  }
}

function* handleEditTask(action: any) {
  try {
    yield put({ type: "EDIT_TASK_STARTED" });
    // yield call(simulateAsyncTask);
    yield put({ type: "EDIT_TASK_SUCCESS", payload: action.payload });
  } catch (error) {
    yield put({ type: "EDIT_TASK_FAILED", error });
  }
}

function* handleToggleTask(action: any) {
  try {
    yield put({ type: "TOGGLE_TASK_STARTED" });
    // yield call(simulateAsyncTask);
    yield put({ type: "TOGGLE_TASK_SUCCESS", payload: action.payload });
  } catch (error) {
    yield put({ type: "TOGGLE_TASK_FAILED", error });
  }
}

export default function* rootSaga() {
  yield takeEvery(ADD_TASK, handleAddTask);
  yield takeEvery(REMOVE_TASK, handleRemoveTask);
  yield takeEvery(EDIT_TASK, handleEditTask);
  yield takeEvery(TOGGLE_TASK_COMPLETION, handleToggleTask);
}
