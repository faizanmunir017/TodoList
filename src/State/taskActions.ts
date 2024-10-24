export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const TOGGLE_TASK_COMPLETION = "TOGGLE_TASK_COMPLETION";

// Actions:
export const addTask = (task: {
  id: number;
  name: string;
  completed: boolean;
}) => ({
  type: ADD_TASK,
  payload: task,
});

export const removeTask = (index: number) => ({
  type: REMOVE_TASK,
  payload: index,
});

export const editTask = (index: number, newName: string) => ({
  type: EDIT_TASK,
  payload: { index, newName },
});

export const toggleTaskCompletion = (index: number) => ({
  type: TOGGLE_TASK_COMPLETION,
  payload: index,
});
