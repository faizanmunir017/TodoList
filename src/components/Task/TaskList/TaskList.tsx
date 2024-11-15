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
    <li className="flex mb-6 items-center gap-4 justify-between p-[12px] bg-black border-solid border border-[#c2b39a] text-white text-[16px]">
      <button
        className="flex items-center gap-[12px] text-white text-[16px] bg-transparent border-none"
        onClick={(e) => {
          e.preventDefault();
          onToggleTask(task._id);
        }}
      >
        <CheckListCircle completed={task.completed} />
      </button>

      {isEditing ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-between w-full  text-white text-base bg-black"
        >
          <input
            className="bg-black text-white"
            type="text"
            {...register("taskName")}
            defaultValue={task.name}
            autoFocus
          />

          <button className="bg-[#88ab33] text-white" type="submit">
            Save
          </button>
          {errors.taskName && (
            <p className="text-red-500 mt-2 text-xs">
              {errors.taskName.message}
            </p>
          )}
        </form>
      ) : (
        <p>{task.name}</p>
      )}

      <div className="flex items-center bg-transparent gap-1">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-transparent text-white border-solid border-0 fill-[#c2b39a]"
        >
          <span className="absolute inset-0 w-px h-px clip-rect overflow-hidden border-0 p-0 whitespace-nowrap">
            Edit
          </span>
          <EditIcon />
        </button>
        <button
          onClick={() => onDeleteTask(task._id)}
          className="bg-transparent text-white border-solid border-0 fill-[#c2b39a]"
        >
          <span className="absolute inset-0 w-px h-px clip-rect overflow-hidden border-0 p-0 whitespace-nowrap">
            Delete
          </span>
          <DeleteButton />
        </button>
      </div>
    </li>
  );
}

export default TaskList;
