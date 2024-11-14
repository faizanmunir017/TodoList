import Section from "components/Section/Section";
import Header from "components/Header/Header";
import { RootState } from "State/store";
import { useSelector, useDispatch } from "react-redux";
import AddTaskContainer from "components/AddTask/AddTaskContainer";
import { useEffect } from "react";
import { fetchTasks } from "State/taskActions";

function TodoList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks.STARTED());
  }, [dispatch]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className=" h-screen bg-black text-white">
      <div className="w-[70%] mx-auto">
        <Header />
        <div className="flex flex-col items-center max-w-[500px] mx-auto gap-[20px]">
          <Section completedCount={completedCount} totalCount={totalCount} />
          <AddTaskContainer />
        </div>
      </div>
    </div>
  );
}

export default TodoList;
