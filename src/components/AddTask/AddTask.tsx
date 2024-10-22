import "./AddTask.css";
import addButton from "../../assets/add-button.svg";
import TaskList from "../Task/TaskList/TaskList";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../State/taskSlice";
import { RootState } from "../../State/store";

const AddTask = (): JSX.Element => {
  const [taskName, setTaskName] = useState<string>("");
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const handleAdd = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const newTask = {
      id: tasks.length + 1,
      name: taskName,
      completed: false,
    };
    dispatch(addTask(newTask));
    setTaskName("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value); // Update taskName state
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
            value={taskName} // Bind input value to taskName
            onChange={handleInputChange} // Handle input change
          />
        </label>
        <button onClick={handleAdd}>
          <span className="visually-hidden">Submit</span>
          <img src={addButton} alt="add-button" width={32} height={32} />
        </button>
      </form>

      <ol>
        {tasks.length > 0 ? (
          tasks.map((task, index) => {
            return <TaskList key={task.id} index={index} task={task} />;
          })
        ) : (
          <p>Seems lonely in here, what are you up to?</p>
        )}
      </ol>
    </>
  );
};

export default AddTask;
