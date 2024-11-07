export const ADD_TASK_STARTED = "ADD_TASK_STARTED";
export const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
export const ADD_TASK_FAILED = "ADD_TASK_FAILED";

export const REMOVE_TASK_STARTED = "REMOVE_TASK_STARTED";
export const REMOVE_TASK_SUCCESS = "REMOVE_TASK_SUCCESS";
export const REMOVE_TASK_FAILED = "REMOVE_TASK_FAILED";

export const EDIT_TASK_STARTED = "EDIT_TASK_STARTED";
export const EDIT_TASK_SUCCESS = "EDIT_TASK_SUCCESS";
export const EDIT_TASK_FAILED = "EDIT_TASK_FAILED";

export const TOGGLE_TASK_STARTED = "TOGGLE_TASK_STARTED";

export const TOGGLE_TASK_SUCCESS = "TOGGLE_TASK_SUCCESS";
export const TOGGLE_TASK_FAILED = "TOGGLE_TASK_FAILED";

export const FETCH_TASKS_STARTED = "FETCH_TASKS_STARTED";
export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const FETCH_TASKS_FAILED = "FETCH_TASKS_FAILED";

export const addTask = (task: {
  id: number;
  name: string;
  completed: boolean;
}) => ({
  type: ADD_TASK_STARTED,
  payload: task,
});

export const removeTask = (index: number) => ({
  type: REMOVE_TASK_STARTED,
  payload: index,
});

export const editTask = (index: number, newName: string) => ({
  type: EDIT_TASK_STARTED,
  payload: { index, newName },
});

export const toggleTaskCompletion = (index: number) => ({
  type: TOGGLE_TASK_STARTED,
  payload: index,
});

export const fetchTasks = () => ({
  type: FETCH_TASKS_STARTED,
});
