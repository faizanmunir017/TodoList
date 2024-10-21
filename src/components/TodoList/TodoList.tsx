import { useEffect, useState } from "react";
import Section from "../Section/Section";
import Header from "../Header/Header";
import AddTask from "../AddTask/AddTask";
import "../../styles/styles.css";

// Define a task object structure
interface Task {
  id: number;
  name: string;
  completed: boolean; // Track if the task is completed
}

function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]); // Array of task objects

  return (
    <div className="container">
      <div className="wrapper">
        <Header />
        <div className="inside-container">
          <Section
            completedCount={tasks.filter((task) => task.completed).length}
            totalCount={tasks.length}
          />
          <AddTask tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </div>
  );
}

export default TodoList;
