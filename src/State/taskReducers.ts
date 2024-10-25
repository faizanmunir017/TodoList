export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

// Reducers:
export const taskReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_TASK_SUCCESS":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "REMOVE_TASK_SUCCESS":
      const updatedTasks = [...state.tasks];
      updatedTasks.splice(action.payload, 1);
      return {
        ...state,
        tasks: updatedTasks,
      };
    case "EDIT_TASK_SUCCESS":
      const { index, newName } = action.payload;
      const editedTasks = [...state.tasks];
      if (editedTasks[index]) {
        editedTasks[index].name = newName;
      }
      return {
        ...state,
        tasks: editedTasks,
      };
    case "TOGGLE_TASK_SUCCESS":
      const tasksWithToggledCompletion = state.tasks.map((task, i) =>
        i === action.payload ? { ...task, completed: !task.completed } : task
      );
      return {
        ...state,
        tasks: tasksWithToggledCompletion,
      };
    default:
      return state;
  }
};
