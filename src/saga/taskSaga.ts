import { takeEvery, call, put, select, Effect } from "redux-saga/effects";
import {
  ADD_TASK_STARTED,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILED,
  REMOVE_TASK_STARTED,
  REMOVE_TASK_SUCCESS,
  REMOVE_TASK_FAILED,
  EDIT_TASK_STARTED,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_FAILED,
  TOGGLE_TASK_STARTED,
  TOGGLE_TASK_SUCCESS,
  TOGGLE_TASK_FAILED,
  FETCH_TASKS_STARTED,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILED,
} from "State/taskActions";
import { Task } from "State/taskReducers";

import axios from "axios";

const BASE_URL = import.meta.env.VITE_TASK_APP_API_URL;
console.log(BASE_URL);

const selectTasks = (state: any) => state.tasks;

function* handleFetchTasks(action: any): Generator<Effect, void, any> {
  try {
    const response = yield call(axios.get, `${BASE_URL}/api/tasks`);
    yield put({ type: FETCH_TASKS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_TASKS_FAILED, error });
  }
}

function* handleAddTask(action: any): Generator<Effect, void, any> {
  try {
    const response = yield call(
      axios.post,
      `${BASE_URL}/api/tasks`,
      action.payload
    );

    yield put({ type: ADD_TASK_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ADD_TASK_FAILED, error });
  }
}

function* handleRemoveTask(action: any) {
  try {
    const taskId = action.payload;
    yield call(axios.delete, `${BASE_URL}/api/tasks/${taskId}`);

    const tasks: Task[] = yield select(selectTasks);
    const updatedTasks = tasks.filter((task) => task._id !== taskId);
    yield put({ type: REMOVE_TASK_SUCCESS, payload: updatedTasks });
  } catch (error) {
    yield put({ type: REMOVE_TASK_FAILED, error });
  }
}

function* handleEditTask(action: any): Generator<Effect, void, any> {
  try {
    const { taskId, newName } = action.payload;
    console.log("TaskID in editSaga", taskId);
    const response = yield call(
      axios.patch,
      `${BASE_URL}/api/tasks/${taskId}/edit`,
      {
        newName,
      }
    );
    const tasks: Task[] = yield select(selectTasks);
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, name: newName } : task
    );
    yield put({ type: EDIT_TASK_SUCCESS, payload: updatedTasks });
  } catch (error) {
    console.log("Saga error");
    yield put({ type: EDIT_TASK_FAILED, error });
  }
}

function* handleToggleTask(action: any): Generator<Effect, void, any> {
  try {
    const taskId = action.payload;

    const response = yield call(
      axios.patch,
      `${BASE_URL}/api/tasks/${taskId}/toggle`
    );

    const tasks = yield select(selectTasks);
    const updatedTasks = tasks.map((task: Task) =>
      task._id === taskId
        ? { ...task, completed: response.data.completed }
        : task
    );

    yield put({ type: TOGGLE_TASK_SUCCESS, payload: updatedTasks });
  } catch (error) {
    yield put({ type: TOGGLE_TASK_FAILED, error });
  }
}

export default function* taskSaga() {
  yield takeEvery(FETCH_TASKS_STARTED, handleFetchTasks);
  yield takeEvery(ADD_TASK_STARTED, handleAddTask);
  yield takeEvery(REMOVE_TASK_STARTED, handleRemoveTask);
  yield takeEvery(EDIT_TASK_STARTED, handleEditTask);
  yield takeEvery(TOGGLE_TASK_STARTED, handleToggleTask);
}
