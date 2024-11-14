import { takeEvery, call, put, select, Effect } from "redux-saga/effects";
import {
  ADD_TASK,
  REMOVE_TASK,
  EDIT_TASK,
  TOGGLE_TASK,
  FETCH_TASKS,
} from "State/taskActionTypes";
import { Task } from "State/taskReducers";

import axios from "axios";

const BASE_URL = import.meta.env.VITE_TASK_APP_API_URL;

const selectTasks = (state: any) => state.tasks.tasks;
const selectToken = (state: any) => state.user.token;

function* handleFetchTasks(action: any): Generator<Effect, void, any> {
  try {
    const token = yield select(selectToken);

    const response = yield call(axios.get, `${BASE_URL}/api/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put({ type: FETCH_TASKS.SUCCESS, payload: response.data });
  } catch (error) {
    console.log("Error name", error);
    yield put({ type: FETCH_TASKS.FAILED, error });
  }
}

function* handleAddTask(action: any): Generator<Effect, void, any> {
  try {
    const token = yield select((state) => state.user.token);
    const response = yield call(
      axios.post,
      `${BASE_URL}/api/tasks`,
      action.payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    yield put({ type: ADD_TASK.SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ADD_TASK.FAILED, error });
  }
}

function* handleRemoveTask(action: any) {
  try {
    const taskId = action.payload;
    yield call(axios.delete, `${BASE_URL}/api/tasks/${taskId}`);

    const tasks: Task[] = yield select(selectTasks);
    const updatedTasks = tasks.filter((task) => task._id !== taskId);
    yield put({ type: REMOVE_TASK.SUCCESS, payload: updatedTasks });
  } catch (error) {
    yield put({ type: REMOVE_TASK.FAILED, error });
  }
}

function* handleEditTask(action: any): Generator<Effect, void, any> {
  try {
    const { taskId, newName } = action.payload;

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
    yield put({ type: EDIT_TASK.SUCCESS, payload: updatedTasks });
  } catch (error) {
    console.log("error", error);
    yield put({ type: EDIT_TASK.FAILED, error });
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

    yield put({ type: TOGGLE_TASK.SUCCESS, payload: updatedTasks });
  } catch (error) {
    yield put({ type: TOGGLE_TASK.FAILED, error });
  }
}

export default function* taskSaga() {
  yield takeEvery(FETCH_TASKS.STARTED, handleFetchTasks);
  yield takeEvery(ADD_TASK.STARTED, handleAddTask);
  yield takeEvery(REMOVE_TASK.STARTED, handleRemoveTask);
  yield takeEvery(EDIT_TASK.STARTED, handleEditTask);
  yield takeEvery(TOGGLE_TASK.STARTED, handleToggleTask);
}
