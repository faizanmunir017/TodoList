import { useState } from "react";
import Header from "./components/Header/Header";
import Section from "./components/Section/Section";
import AddTask from "./components/AddTask/AddTask";
import TaskList from "./components/Task/TaskList/TaskList";

import "./styles/styles.css";

// Define a task object structure
interface Task {
  id: number;
  name: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]); // Array of task objects
  const [taskName, setTaskName] = useState<string>(""); // State for task input

  const addTask = () => {
    // Add a new task with an id and name

    setTasks((prevTasks) => [
      ...prevTasks,
      { id: prevTasks.length + 1, name: taskName },
    ]);
    setTaskName(""); // Clear input after adding
  };

  const removeTask = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <Header />
          <Section />
          {/* Pass the taskName and setTaskName for input handling */}
          <AddTask
            tasks={tasks}
            addTask={addTask}
            removeTask={removeTask}
            taskName={taskName}
            setTaskName={setTaskName}
          />
        </div>
      </div>
    </>
  );
}

export default App;
