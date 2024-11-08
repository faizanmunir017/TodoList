import "./TaskList.css";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "validation/form-validation";

import { CheckListCircle } from "assets/checkList-Icon";
import EditIcon from "assets/Edit-Icon";
import DeleteButton from "assets/Delete-Icon";

interface TaskListProps {
  index: number;
  task: { _id: string; name: string; completed: boolean };
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (taskId: string, newName: string) => void;
}

interface FormData {
  taskName: string;
}

function TaskList({
  index,
  task,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}: TaskListProps) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { taskName: task.name },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    onEditTask(task._id, data.taskName);
    setIsEditing(false);
    reset({ taskName: data.taskName });
  };

  return (
    <li className="todo_item">
      <button
        className="todo_items_left"
        onClick={(e) => {
          e.preventDefault();
          // console.log("TaskList toggle task Id", task._id);
          onToggleTask(task._id);
        }}
      >
        <CheckListCircle completed={task.completed} />
      </button>

      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
          <input
            className="edit-text"
            type="text"
            {...register("taskName")}
            defaultValue={task.name}
            autoFocus
          />

          <button className="save-button" type="submit">
            Save
          </button>
          {errors.taskName && (
            <p className="error">{errors.taskName.message}</p>
          )}
        </form>
      ) : (
        <p>{task.name}</p>
      )}

      <div className="todo_items_right">
        <button onClick={() => setIsEditing(true)}>
          <span className="visually-hidden">Edit</span>
          <EditIcon />
        </button>
        <button onClick={() => onDeleteTask(task._id)}>
          <span className="visually-hidden">Delete</span>
          <DeleteButton />
        </button>
      </div>
    </li>
  );
}

export default TaskList;
