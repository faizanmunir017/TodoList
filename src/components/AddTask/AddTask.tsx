import "./AddTask.css";
import addButton from "../../assets/add-button.svg"; // Corrected path
import TaskList from "../Task/TaskList/TaskList";

interface AddTaskProps {
  tasks: { id: number; name: string }[]; // Array of task objects
  addTask: () => void;
  removeTask: (index: number) => void;
  taskName: string; // Task input value
  setTaskName: (name: string) => void; // Function to update task input
}

function AddTask({
  tasks,
  addTask,
  removeTask,
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

      <ol className="todo_list">
        {tasks.length > 0
          ? tasks.map((task, index) => (
              <TaskList
                key={index}
                index={index}
                removeTask={removeTask}
                taskName={task.name} // Pass task name as prop
              />
            ))
          : null}
      </ol>
    </>
  );
}

export default AddTask;
