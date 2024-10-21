import "./AddTask.css";
import addButton from "../../assets/add-button.svg";

import TaskList from "../Task/TaskList/TaskList";
import { useEffect, useState } from "react";

export type SetTask = React.Dispatch<
  React.SetStateAction<{ id: number; name: string; completed: boolean }[]>
>;

interface AddTaskProps {
  tasks: { id: number; name: string; completed: boolean }[]; // Array of task objects
  setTasks: SetTask;
}

const AddTask = ({ tasks, setTasks }: AddTaskProps) => {
  const [taskName, setTaskName] = useState<string>(""); // State for task input

  const addTask = () => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: prevTasks.length + 1, name: taskName, completed: false },
    ]);
    setTaskName("");
  };

  const removeTask = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const handleAdd = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    addTask(); // Call addTask from props
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value); // Update taskName state
  };

  const editTask = (index: number, newTaskName: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].name = newTaskName; // Update the task name
      return updatedTasks;
    });
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
              <TaskList
                key={task.id} // Use id for a unique key
                index={index}
                removeTask={removeTask}
                setTasks={setTasks} // Pass toggle function
                task={task}
                editTask={editTask}
              />
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
