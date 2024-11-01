import "./AddTask.css";
import addButton from "../../assets/add-button.svg";

import TaskList from "../Task/TaskList/TaskList";
import { tasksState, taskNameState } from "../../state/state";
import { useHookstate } from "@hookstate/core";

const AddTask = () => {
  const tasks = useHookstate(tasksState);
  const taskName = useHookstate(taskNameState);

  const addTask = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    tasks.merge([
      {
        id: tasks.length + 1,
        name: taskName.get(),
        completed: false,
      },
    ]);
    taskName.set(""); // Clear the task input field after adding a task
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    taskName.set(event.target.value); // Update task name input
  };

  return (
    <>
      <form className="form">
        <label htmlFor="todo">
          <input
            type="text"
            id="todo"
            placeholder="Write your next task"
            name="todo"
            value={taskName.get()} // Bind input value to taskName
            onChange={handleInputChange} // Handle input change
          />
        </label>
        <button onClick={addTask}>
          <span className="visually-hidden">Submit</span>
          <img src={addButton} alt="add-button" width={32} height={32} />
        </button>
      </form>

      <ol>
        {tasks.length > 0 ? (
          tasks.map((_, index) => {
            return <TaskList index={index} />;
          })
        ) : (
          <p>Seems lonely in here, what are you up to?</p>
        )}
      </ol>
    </>
  );
};

export default AddTask;
