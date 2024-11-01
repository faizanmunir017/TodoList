import { hookstate } from "@hookstate/core";

export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export const tasksState = hookstate<Task[]>([]);
export const taskNameState = hookstate<string>("");
export const setEditState = hookstate<boolean>(false);
