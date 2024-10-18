import "./AddTask.css";
import addButton from "../../assets/add-button.svg"; // Corrected path
import TaskList from "../Task/TaskList/TaskList";
import { useEffect } from "react";

interface AddTaskProps {
  tasks: { id: number; name: string; completed: boolean }[]; // Array of task objects
  addTask: () => void;
  removeTask: (index: number) => void;
  toggleTaskCompletion: (index: number) => void; // Pass toggle function
  taskName: string; // Task input value
  setTaskName: (name: string) => void; // Function to update task input
}

function AddTask({
  tasks,
  addTask,
  removeTask,
  toggleTaskCompletion,
  taskName,
  setTaskName,
}: AddTaskProps) {
  const handleAdd = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    addTask(); // Call addTask from props
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value); // Update taskName state
  };

  // useEffect(() => {
  //   console.log(tasks);
  // }, [tasks]);

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
                toggleTaskCompletion={() => toggleTaskCompletion(index)} // Pass toggle function
                task={task}
                taskName={task.name} // Pass task name as prop
                completed={task.completed} // Pass completion status
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
