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

export const taskReducer = (state = initialState, action: any): TaskState => {
  switch (action.type) {
    case "ADD_TASK_SUCCESS":
    case "REMOVE_TASK_SUCCESS":
    case "EDIT_TASK_SUCCESS":
    case "TOGGLE_TASK_SUCCESS":
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
};
