import { TaskResolved } from "@reduxjs/toolkit";
import { useMutation } from "@tanstack/react-query";
import { Task } from "components/AddTask/AddTask";

export const useAddTask = () => {
  return useMutation<Task, Error, Task>({
    mutationFn: async (newTask: Task) => {
      const response = await fetch(
        "https://6720e38798bbb4d93ca687c8.mockapi.io/api/todo-list/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        }
      );

      if (!response.ok) {
        throw new Error("Error message");
      }

      return response.json();
    },
  });
};
