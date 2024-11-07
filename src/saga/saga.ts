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

const selectTasks = (state: any) => state.tasks;

function* handleFetchTasks(action: any): Generator<Effect, void, any> {
  try {
    const response = yield call(axios.get, "http://localhost:5000/api/tasks");
    yield put({ type: FETCH_TASKS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_TASKS_FAILED, error });
  }
}

function* handleAddTask(action: any) {
  try {
    const tasks: Task[] = yield select(selectTasks);
    const updatedTasks = [...tasks, action.payload];
    yield put({ type: ADD_TASK_SUCCESS, payload: updatedTasks });
  } catch (error) {
    yield put({ type: ADD_TASK_FAILED, error });
  }
}

function* handleRemoveTask(action: any) {
  try {
    const tasks: Task[] = yield select(selectTasks);
    const updatedTasks = tasks.filter((_, index) => index !== action.payload);
    yield put({ type: REMOVE_TASK_SUCCESS, payload: updatedTasks });
  } catch (error) {
    yield put({ type: REMOVE_TASK_FAILED, error });
  }
}

function* handleEditTask(action: any) {
  try {
    const tasks: Task[] = yield select(selectTasks);
    const { index, newName } = action.payload;
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, name: newName } : task
    );
    yield put({ type: EDIT_TASK_SUCCESS, payload: updatedTasks });
  } catch (error) {
    yield put({ type: EDIT_TASK_FAILED, error });
  }
}

function* handleToggleTask(action: any) {
  try {
    const tasks: Task[] = yield select(selectTasks);
    const updatedTasks = tasks.map((task, index) =>
      index === action.payload ? { ...task, completed: !task.completed } : task
    );
    yield put({ type: TOGGLE_TASK_SUCCESS, payload: updatedTasks });
  } catch (error) {
    yield put({ type: TOGGLE_TASK_FAILED, error });
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_TASKS_STARTED, handleFetchTasks);
  yield takeEvery(ADD_TASK_STARTED, handleAddTask);
  yield takeEvery(REMOVE_TASK_STARTED, handleRemoveTask);
  yield takeEvery(EDIT_TASK_STARTED, handleEditTask);
  yield takeEvery(TOGGLE_TASK_STARTED, handleToggleTask);
}
