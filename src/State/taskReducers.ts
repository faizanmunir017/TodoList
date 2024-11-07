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
  console.log("Action:", action);
  console.log("State:", state);
  switch (action.type) {
    case "ADD_TASK_SUCCESS":
    case "REMOVE_TASK_SUCCESS":
    case "EDIT_TASK_SUCCESS":
    case "TOGGLE_TASK_SUCCESS":
    case "FETCH_TASKS_SUCCESS":
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
};
