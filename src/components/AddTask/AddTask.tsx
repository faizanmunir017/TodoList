import addButton from "assets/add-button.svg";
import TaskListContainer from "components/Task/TaskList/TaskListContainer";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "validation/form-validation";

export interface Task {
  _id?: string;
  name: string;
  completed: boolean;
}

interface AddTaskProps {
  tasks: Task[];
  addTask: (task: Task) => void;
}

const AddTask = ({ tasks, addTask }: AddTaskProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ taskName: string }>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<{ taskName: string }> = async (data) => {
    const newTask = {
      name: data.taskName,
      completed: false,
    };

    addTask(newTask);
    reset();
  };

  return (
    <>
      <form
        className="flex justify-between w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="w-[85%]" htmlFor="todo">
          <input
            className="h-5 bg-slate-800 rounded-[11px] text-white w-full outline-none border-none p-[20px]"
            type="text"
            id="todo"
            placeholder="Write your next task"
            {...register("taskName")}
          />
          {errors.taskName && (
            <p className="text-red-500 mt-[10px]">{errors.taskName.message}</p>
          )}
        </label>
        <button
          className="w-[10%] bg-[#88ab33] border-none flex justify-center items-center rounded-[11px]"
          type="submit"
        >
          <span className="absolute clip-[rect(1px,1px,1px,1px)] p-0 border-0 h-[1px] w-[1px] overflow-hidden whitespace-nowrap">
            Submit
          </span>
          {/* <img src={addButton} alt="add-button" width={32} height={32} /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            clip-rule="evenodd"
            fill-rule="evenodd"
            stroke-linejoin="round"
            stroke-miterlimit="2"
            viewBox="0 0 24 24"
            width="32"
            height="32"
          >
            <path
              d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
              fill-rule="nonzero"
            />
          </svg>
        </button>
      </form>

      <ol className="w-full">
        {tasks.length > 0 ? (
          tasks.map((task, index) => {
            return (
              <TaskListContainer key={task._id} index={index} task={task} />
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
