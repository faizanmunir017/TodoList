import "./AddTask.css";
import addButton from "../../assets/add-button.svg"; // Corrected path
import TaskList from "../Task/TaskList/TaskList";
import { useState } from "react";

function AddTask(): JSX.Element {
  const [showTaskList, setTaskList] = useState<number[]>([]);

  const add = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setTaskList((prevTaskList) => [...prevTaskList, prevTaskList.length + 1]);
    console.log("add button clicked");
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
          ></input>
        </label>
        <button onClick={add}>
          <span className="visually-hidden">Submit</span>
          <img src={addButton} alt="add-button" width={32} height={32} />
        </button>
      </form>
      {}

      <ol className="todo_list">
        {showTaskList.length > 0 ? (
          showTaskList.map((_, index) => (
            // Add parentheses here to return the JSX
            <TaskList key={index} />
          ))
        ) : (
          <p>Seems lonely in here, what are you up to?</p>
        )}
      </ol>
    </>
  );
}

export default AddTask;
