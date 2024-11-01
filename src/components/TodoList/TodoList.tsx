import Section from "../Section/Section";
import Header from "../Header/Header";
import AddTask from "../AddTask/AddTask";
import { useHookstate } from "@hookstate/core";
import { tasksState } from "../../state/state"; // Import global state
import "../../styles/styles.css";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

function TodoList() {
  const tasks = useHookstate(tasksState);

  return (
    <div className="container">
      <div className="wrapper">
        <Header />
        <div className="inside-container">
          <Section
            completedCount={
              tasks.get().filter((task: Task) => task.completed).length
            }
            totalCount={tasks.length}
          />
          <AddTask />
        </div>
      </div>
    </div>
  );
}

export default TodoList;
