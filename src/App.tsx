import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Section from "./components/Section/Section";
import AddTask from "./components/AddTask/AddTask";
import TaskList from "./components/Task/TaskList/TaskList";
import "./styles/styles.css";

// Define a task object structure
interface Task {
  id: number;
  name: string;
  completed: boolean; // Track if the task is completed
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]); // Array of task objects
  const [taskName, setTaskName] = useState<string>(""); // State for task input
  const [completedCount, setCompletedCount] = useState<number>(0); // Completed tasks count

  const addTask = () => {
    // Add a new task with an id, name, and completed status
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: prevTasks.length + 1, name: taskName, completed: false },
    ]);
    setTaskName(""); // Clear input after adding
  };

  const removeTask = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    console.log("here");
  };

  // const toggleTaskCompletion = (index: number) => {
  //   setTasks((prevTasks) => {
  //     const updatedTasks = [...prevTasks];
  //     const wasCompleted = updatedTasks[index].completed; // Check if the task was already completed
  //     updatedTasks[index].completed = !wasCompleted; // Toggle the completed state

  //     return updatedTasks; // Return the updated tasks
  //   });

  //   // Calculate the new completed count after setting the tasks
  //   const newCompletedCount =
  //     tasks.filter((task) => task.completed).length +
  //     (tasks[index].completed ? 1 : -1);
  //   setCompletedCount(newCompletedCount); // Update completed count
  // };
  // console.log("My Tasks:", tasks);
  // const toggleTaskCompletion = (index: number) => {
  //   setTasks((prevTasks) => {
  //     const updatedTasks = [...prevTasks];
  //     // console.log(updatedTasks[index].completed);
  //     updatedTasks[index].completed = !updatedTasks[index].completed; // Toggle the completed state

  //     // console.log("index :", index);

  //     // const newCompletedCount = updatedTasks.filter(
  //     //   (task) => task.completed
  //     // ).length;
  //     // setCompletedCount(newCompletedCount);

  //     return updatedTasks;
  //   });
  // };
  const toggleTaskCompletion = (index: number) => {
    setTasks((prevTasks) => {
      let task = prevTasks.find((_, i) => i === index) as Task;
      task = {
        ...task,
        completed: !task?.completed,
      }; // Toggle the completed state
      console.log("here toggle");

      return [...prevTasks.filter((_, i) => i !== index), task];
    });
  };

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <Header />
          <Section completedCount={completedCount} totalCount={tasks.length} />
          <AddTask
            tasks={tasks}
            addTask={addTask}
            removeTask={removeTask}
            toggleTaskCompletion={toggleTaskCompletion} // Pass the toggle function
            taskName={taskName}
            setTaskName={setTaskName}
          />
        </div>
      </div>
    </>
  );
}

export default App;
