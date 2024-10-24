import "./AddTask.css";
import addButton from "../../assets/add-button.svg";
import TaskListContainer from "../Task/TaskList/TaskListContainer";

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

const AddTask = ({ tasks, addTask }: AddTaskProps): JSX.Element => {
  const [taskName, setTaskName] = useState<string>("");

  const handleAdd = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const newTask = {
      id: tasks.length + 1,
      name: taskName,
      completed: false,
    };
    addTask(newTask);
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
