import {
  ADD_TASK,
  REMOVE_TASK,
  EDIT_TASK,
  TOGGLE_TASK,
  FETCH_TASKS,
} from "State/taskActionTypes";

export const addTask = {
  STARTED: (task: { name: string; completed: boolean }) => ({
    type: ADD_TASK.STARTED,
    payload: task,
  }),
};

export const removeTask = {
  STARTED: (taskId: string) => ({
    type: REMOVE_TASK.STARTED,
    payload: taskId,
  }),
};

export const editTask = {
  STARTED: (taskId: string, newName: string) => ({
    type: EDIT_TASK.STARTED,
    payload: { taskId, newName },
  }),
};

export const toggleTaskCompletion = {
  STARTED: (taskId: string) => ({
    type: TOGGLE_TASK.STARTED,
    payload: taskId,
  }),
};

export const fetchTasks = {
  STARTED: () => ({
    type: FETCH_TASKS.STARTED,
  }),
};
