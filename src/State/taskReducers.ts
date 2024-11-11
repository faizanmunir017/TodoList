export interface Task {
  _id?: string;
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
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "TOGGLE_TASK_SUCCESS":
      console.log("toggle task Redcuer: ", action.payload);
      return {
        ...state,
        tasks: action.payload,
      };

    case "REMOVE_TASK_SUCCESS":
    case "EDIT_TASK_SUCCESS":

    case "FETCH_TASKS_SUCCESS":
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
};
