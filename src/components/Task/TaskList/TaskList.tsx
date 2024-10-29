import "./TaskList.css";

import { useState, useRef } from "react";
import { CheckListCircle } from "../../../assets/checkListCircle";
import EditIcon from "../../../assets/Edit-Icon";
import DeleteButton from "../../../assets/Delete-Icon";

interface TaskListProps {
  index: number;
  task: { id: number; name: string; completed: boolean };
  onToggleTask: (index: number) => void;
  onDeleteTask: (index: number) => void;
  onEditTask: (index: number, newName: string) => void;
}

function TaskList({
  index,
  task,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}: TaskListProps) {
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
      if (newTaskName.length < 3) {
        alert("Task name must be at least 3 characters long");
        return;
      }
      onEditTask(index, newTaskName);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLParagraphElement>) => {
    if (event.key === "Enter") {
      console.log("Enter Pressed");
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
          onToggleTask(index);
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
        <button onClick={() => onDeleteTask(index)}>
          <span className="visually-hidden">Delete</span>

          <DeleteButton></DeleteButton>
        </button>
      </div>
    </li>
  );
}

export default TaskList;
