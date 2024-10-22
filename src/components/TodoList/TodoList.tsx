import Section from "../Section/Section";
import Header from "../Header/Header";
import AddTask from "../AddTask/AddTask";
import "../../styles/styles.css";
import { RootState } from "../../State/store";
import { useSelector } from "react-redux";

function TodoList() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks); // Get tasks from Redux

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="container">
      <div className="wrapper">
        <Header />
        <div className="inside-container">
          <Section completedCount={completedCount} totalCount={totalCount} />
          <AddTask />
        </div>
      </div>
    </div>
  );
}

export default TodoList;
