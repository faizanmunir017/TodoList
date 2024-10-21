import TodoList from "./components/TodoList/TodoList";

// Define a task object structure
interface Task {
  id: number;
  name: string;
  completed: boolean; // Track if the task is completed
}

function App() {
  return <TodoList></TodoList>;
}

export default App;
