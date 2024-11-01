import "./TaskList.css";

import { useRef } from "react";
import { CheckListCircle } from "../../../assets/checkListCircle";
import EditIcon from "../../../assets/Edit-Icon";
import DeleteButton from "../../../assets/Delete-Icon";
import { useHookstate } from "@hookstate/core";
import { tasksState, setEditState } from "../../../state/state";

interface TaskListProps {
  index: number;
}

function TaskList({ index }: TaskListProps) {
  const tasks = useHookstate(tasksState);
  const isEdit = useHookstate(setEditState);

  const handleDelete = () => {
    tasks.set((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const taskNameRef = useRef<HTMLParagraphElement>(null);

  const handleEdit = () => {
    isEdit.set(true);
    taskNameRef.current?.focus();
  };

  const editTask = (index: number, newTaskName: string) => {
    tasks[index].merge({ name: newTaskName });
  };

  const handleEditSubmit = () => {
    if (taskNameRef.current) {
      const newTaskName = taskNameRef.current.textContent || "";
      editTask(index, newTaskName);
    }
    isEdit.set(false);
  };

  const toggleTaskCompletion = () => {
    tasks[index].merge({ completed: !tasks[index].completed.get() });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLParagraphElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleEditSubmit();
    }
  };

  return (
    <li className="todo_item">
      <button
        className="todo_items_left"
        onClick={(e) => {
          e.preventDefault();
          toggleTaskCompletion();
        }}
      >
        <CheckListCircle completed={tasks[index].completed.get()} />
      </button>
      <p
        ref={taskNameRef}
        contentEditable={isEdit.get()}
        suppressContentEditableWarning={true}
        onKeyDown={handleKeyDown}
      >
        {tasks[index].name.get()}
      </p>
      <div className="todo_items_right">
        <button onClick={handleEdit}>
          <span className="visually-hidden">Edit</span>
          <EditIcon></EditIcon>
        </button>
        <button onClick={handleDelete}>
          <span className="visually-hidden">Delete</span>

          <DeleteButton></DeleteButton>
        </button>
      </div>
    </li>
  );
}

export default TaskList;
