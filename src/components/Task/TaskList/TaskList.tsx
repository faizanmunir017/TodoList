import "./TaskList.css";

import { useState, useRef } from "react";
import { CheckListCircle } from "../../../assets/checkListCircle";
import EditIcon from "../../../assets/Edit-Icon";
import DeleteButton from "../../../assets/Delete-Icon";
import { useDispatch } from "react-redux"; // Import useDispatch
import {
  removeTask,
  editTask,
  toggleTaskCompletion,
} from "../../../State/taskSlice";

interface TaskListProps {
  index: number;
  task: { id: number; name: string; completed: boolean };
}

function TaskList({ index, task }: TaskListProps) {
  const dispatch = useDispatch(); // Initialize dispatch

  const handleDelete = () => {
    dispatch(removeTask(index));
  };

  const [isEditing, setIsEditing] = useState(false);
  const taskNameRef = useRef<HTMLParagraphElement>(null);

  const handleEdit = () => {
    console.log("Edit button clicked");
    setIsEditing(true);
    setTimeout(() => {
      taskNameRef.current?.focus();
    }, 0);
  };

  const handleEditSubmit = () => {
    if (taskNameRef.current) {
      const newTaskName = taskNameRef.current.textContent || task.name;
      dispatch(editTask({ index, newName: newTaskName })); // Dispatch editTask with the updated task name
    }
    setIsEditing(false);
  };

  const handleToggleCompletion = () => {
    dispatch(toggleTaskCompletion(index)); // Dispatch the toggleTaskCompletion action with the task index
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
          handleToggleCompletion();
        }}
        tabIndex={isEditing ? -1 : 0}
      >
        <CheckListCircle completed={task.completed} />
      </button>
      <p
        className="todo_items_left"
        ref={taskNameRef}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onKeyDown={handleKeyDown}
      >
        {task.name}
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
