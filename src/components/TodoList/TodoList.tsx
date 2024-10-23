import Section from "../Section/Section";
import Header from "../Header/Header";
import "../../styles/styles.css";
import { RootState } from "../../State/store";
import { useSelector } from "react-redux";
import AddTaskContainer from "../AddTask/AddTaskContainer";

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
          <AddTaskContainer />
        </div>
      </div>
    </div>
  );
}

export default TodoList;
