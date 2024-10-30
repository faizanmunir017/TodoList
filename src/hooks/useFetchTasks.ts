import { useQuery } from "@tanstack/react-query";
import { Task } from "components/AddTask/AddTask";

export const useFetchTasks = () => {
  return useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch(
        "https://6720e38798bbb4d93ca687c8.mockapi.io/api/todo-list/tasks"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      return response.json();
    },
  });
};
