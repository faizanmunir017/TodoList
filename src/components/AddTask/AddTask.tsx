import "./AddTask.css";
import addButton from "assets/add-button.svg";
import { TaskListContainer } from "components/Task/TaskList/TaskListContainer";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "validation/form-validation";
import { useFetchTasks } from "hooks/useFetchTasks";
import { useAddTask } from "hooks/useAddTask";
import { useEffect, useState } from "react";

export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

interface AddTaskProps {
  tasks: Task[];
  addTask: (task: Task) => void;
}

const AddTask = ({ tasks, addTask }: AddTaskProps): JSX.Element => {
  const { data: initialTasks, error, isLoading } = useFetchTasks();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ taskName: string }>({
    resolver: yupResolver(schema),
  });

  const mutation = useAddTask();

  useEffect(() => {
    if (initialTasks) {
      initialTasks.forEach((task) => {
        addTask(task);
      });
    }
  }, [initialTasks, addTask]);

  const onSubmit: SubmitHandler<{ taskName: string }> = (data) => {
    const newTask = {
      id: tasks.length + 1,
      name: data.taskName,
      completed: false,
    };

    mutation.mutate(newTask);

    addTask(newTask);
    reset();
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="todo">
          <input
            type="text"
            id="todo"
            placeholder="Write your next task"
            {...register("taskName")}
          />
          {errors.taskName && (
            <p className="error">{errors.taskName.message}</p>
          )}
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
