import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    removeTask(state, action: PayloadAction<number>) {
      state.tasks.splice(action.payload, 1);
    },
    editTask(state, action: PayloadAction<{ index: number; newName: string }>) {
      const { index, newName } = action.payload;
      if (state.tasks[index]) {
        state.tasks[index].name = newName;
      }
    },
    toggleTaskCompletion(state, action: PayloadAction<number>) {
      const task = state.tasks[action.payload];
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

export const { addTask, editTask, removeTask, toggleTaskCompletion } =
  taskSlice.actions;

export default taskSlice.reducer;
