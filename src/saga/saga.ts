import { takeEvery, put, call, select } from "redux-saga/effects";
import {
  ADD_TASK,
  REMOVE_TASK,
  EDIT_TASK,
  TOGGLE_TASK_COMPLETION,
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
} from "../State/taskActions";
import { Task } from "../State/taskReducers";

const selectTasks = (state: any) => state.tasks;

// Add task saga
function* handleAddTask(action: any) {
  try {
    yield put({ type: ADD_TASK_STARTED });
    const tasks: Task[] = yield select(selectTasks);
    const updatedTasks = [...tasks, action.payload];
    yield put({ type: ADD_TASK_SUCCESS, payload: updatedTasks });
  } catch (error) {
    yield put({ type: ADD_TASK_FAILED, error });
  }
}

function* handleRemoveTask(action: any) {
  try {
    yield put({ type: REMOVE_TASK_STARTED });
    const tasks: Task[] = yield select(selectTasks);
    const updatedTasks = tasks.filter((_, index) => index !== action.payload);
    yield put({ type: REMOVE_TASK_SUCCESS, payload: updatedTasks });
  } catch (error) {
    yield put({ type: REMOVE_TASK_FAILED, error });
  }
}

// Edit task saga
function* handleEditTask(action: any) {
  try {
    yield put({ type: EDIT_TASK_STARTED });
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

// Toggle task completion saga
function* handleToggleTask(action: any) {
  try {
    yield put({ type: TOGGLE_TASK_STARTED });
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
  yield takeEvery(ADD_TASK, handleAddTask);
  yield takeEvery(REMOVE_TASK, handleRemoveTask);
  yield takeEvery(EDIT_TASK, handleEditTask);
  yield takeEvery(TOGGLE_TASK_COMPLETION, handleToggleTask);
}
