import styles from "./TaskList.module.css";
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
    <li className={styles.todo_item}>
      <button
        className={styles.todo_items_left}
        onClick={(e) => {
          e.preventDefault();
          onToggleTask(task._id);
        }}
      >
        <CheckListCircle completed={task.completed} />
      </button>

      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.edit_form}>
          <input
            className="edit-text"
            type="text"
            {...register("taskName")}
            defaultValue={task.name}
            autoFocus
          />

          <button className={styles.save_button} type="submit">
            Save
          </button>
          {errors.taskName && (
            <p className={styles.error}>{errors.taskName.message}</p>
          )}
        </form>
      ) : (
        <p>{task.name}</p>
      )}

      <div className={styles.todo_items_right}>
        <button onClick={() => setIsEditing(true)}>
          <span className={styles.visually_hidden}>Edit</span>
          <EditIcon />
        </button>
        <button onClick={() => onDeleteTask(task._id)}>
          <span className={styles.visually_hidden}>Delete</span>
          <DeleteButton />
        </button>
      </div>
    </li>
  );
}

export default TaskList;
