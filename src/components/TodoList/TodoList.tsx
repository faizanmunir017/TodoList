import Section from "components/Section/Section";
import Header from "components/Header/Header";
import "styles/styles.css";
import { RootState } from "State/store";
import { useSelector, useDispatch } from "react-redux";
import AddTaskContainer from "components/AddTask/AddTaskContainer";
import { useEffect } from "react";
import { fetchTasks } from "State/taskActions";

function TodoList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

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
