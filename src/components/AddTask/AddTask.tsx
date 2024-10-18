import "./AddTask.css";
import addButton from "../../assets/add-button.svg"; // Corrected path
import TaskList from "../Task/TaskList/TaskList";
import { useEffect, useState } from "react";

interface AddTaskProps {
  tasks: { id: number; name: string; completed: boolean }[]; // Array of task objects
  setTasks: React.Dispatch<
    React.SetStateAction<{ id: number; name: string; completed: boolean }[]>
  >;
}

function AddTask({ tasks, setTasks }: AddTaskProps) {
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

  const toggleTaskCompletion = (index: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task, i) => {
        if (i === index) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      console.log("here");
      return updatedTasks; // Return the updated tasks array
    });
  };

  const handleAdd = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    addTask(); // Call addTask from props
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
              <TaskList
                key={task.id} // Use id for a unique key
                index={index}
                removeTask={removeTask}
                toggleTaskCompletion={toggleTaskCompletion} // Pass toggle function
                task={task}
              />
            );
          })
        ) : (
          <p>Seems lonely in here, what are you up to?</p>
        )}
      </ol>
    </>
  );
}

export default AddTask;
