import "./TaskList.css";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "validation/form-validation";

import { CheckListCircle } from "assets/checkList-Icon";
import EditIcon from "assets/Edit-Icon";
import DeleteButton from "assets/Delete-Icon";

interface TaskListProps {
  key: string;
  index: number;
  task: { id: number; name: string; completed: boolean };
  onToggleTask: (index: number) => void;
  onDeleteTask: (index: number) => void;
  onEditTask: (index: number, newName: string) => void;
}

interface FormData {
  taskName: string;
}

function TaskList({
  key,
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
    onEditTask(index, data.taskName);
    setIsEditing(false);
    reset({ taskName: data.taskName });
  };

  return (
    <li className="todo_item" key={key}>
      <button
        className="todo_items_left"
        onClick={(e) => {
          e.preventDefault();
          onToggleTask(index);
        }}
        tabIndex={isEditing ? -1 : 0}
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
        <p onDoubleClick={() => setIsEditing(true)}>{task.name}</p>
      )}

      <div className="todo_items_right">
        <button onClick={() => setIsEditing(true)}>
          <span className="visually-hidden">Edit</span>
          <EditIcon />
        </button>
        <button onClick={() => onDeleteTask(index)}>
          <span className="visually-hidden">Delete</span>
          <DeleteButton />
        </button>
      </div>
    </li>
  );
}

export default TaskList;
