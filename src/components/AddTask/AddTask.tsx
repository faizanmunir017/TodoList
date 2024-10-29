import "./AddTask.css";
import addButton from "../../assets/add-button.svg";
import TaskListContainer from "../Task/TaskList/TaskListContainer";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

import { useState } from "react";

interface AddTaskProps {
  tasks: Task[];
  addTask: (task: Task) => void;
}

const schema = yup
  .object({
    taskName: yup
      .string()
      .required("Task name is required")
      .min(3, "Task name must be at least 3 characters long"),
  })
  .required();

const AddTask = ({ tasks, addTask }: AddTaskProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ taskName: string }>({
    resolver: yupResolver(schema),
  });

  // const [taskName, setTaskName] = useState<string>("");

  const onSubmit: SubmitHandler<{ taskName: string }> = (data) => {
    const newTask = {
      id: tasks.length + 1,
      name: data.taskName,
      completed: false,
    };
    addTask(newTask);
    reset(); // Reset the form after submission
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="todo">
          <input
            type="text"
            id="todo"
            placeholder="Write your next task"
            {...register("taskName")} // Register input with form
          />
        </label>
        <button type="submit">
          <span className="visually-hidden">Submit</span>
          <img src={addButton} alt="add-button" width={32} height={32} />
        </button>
      </form>

      <ol>
        {tasks.length > 0 ? (
          tasks.map((task, index) => {
            return (
              <TaskListContainer key={task.id} index={index} task={task} />
            );
          })
        ) : (
          <p>Seems lonely in here, what are you up to?</p>
        )}
      </ol>
    </>
  );
};

export default AddTask;
