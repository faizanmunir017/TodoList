import {
  ADD_TASK,
  REMOVE_TASK,
  EDIT_TASK,
  TOGGLE_TASK,
  FETCH_TASKS,
} from "State/taskActionTypes";

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
    case ADD_TASK.SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case TOGGLE_TASK.SUCCESS:
      return {
        ...state,
        tasks: action.payload,
      };

    case REMOVE_TASK.SUCCESS:
    case EDIT_TASK.SUCCESS:
    case FETCH_TASKS.SUCCESS:
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
};
