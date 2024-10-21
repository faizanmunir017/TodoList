import "./TaskList.css";

import { SetTask } from "../../AddTask/AddTask";
import { useState, useRef } from "react";
import { CheckListCircle } from "../../../assets/checkListCircle";
import EditIcon from "../../../assets/Edit-Icon";
import DeleteButton from "../../../assets/Delete-Icon";
// C:\Users\Mergestack\Desktop\Projects\todoList\todoList\src\assets\Edit-Icon.tsx

interface TaskListProps {
  index: number;
  removeTask: (index: number) => void;
  setTasks: SetTask;
  editTask: (index: number, newTaskName: string) => void;
  task: { id: number; name: string; completed: boolean };
}

function TaskList({
  index,
  removeTask,
  setTasks,
  editTask,
  task,
}: TaskListProps) {
  const handleDelete = () => {
    removeTask(index); // Call the removeTask function with the task index
  };

  const [isEditing, setIsEditing] = useState(false);
  const taskNameRef = useRef<HTMLParagraphElement>(null);

  const handleEdit = () => {
    console.log("Edit button clicked");
    setIsEditing(true); // Enter edit mode
    setTimeout(() => {
      taskNameRef.current?.focus(); // Set focus to the <p> tag
    }, 0);
  };

  const handleEditSubmit = () => {
    if (taskNameRef.current) {
      const newTaskName = taskNameRef.current.textContent || task.name; // Get the new task name from the ref
      editTask(index, newTaskName); // Pass the new task name to the editTask function
    }
    setIsEditing(false); // Exit edit mode after saving
  };
  const toggleTaskCompletion = (index: number) => {
    console.log("toggle complete");
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task, i) => {
        if (i === index) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      return updatedTasks; // Return the updated tasks array
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLParagraphElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent newline insertion in contentEditable
      handleEditSubmit(); // Save and exit edit mode
    }
  };

  return (
    <li className="todo_item">
      <button
        className="todo_items_left"
        onClick={(e) => {
          e.preventDefault();
          toggleTaskCompletion(index);
        }}
      >
        <CheckListCircle completed={task.completed} />
        <p
          ref={taskNameRef}
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
          onKeyDown={handleKeyDown}
        >
          {task.name}
        </p>
      </button>
      <div className="todo_items_right">
        <button onClick={handleEdit}>
          <span className="visually-hidden">Edit</span>
          <EditIcon></EditIcon>
        </button>
        <button onClick={handleDelete}>
          <span className="visually-hidden">Delete</span>

          <DeleteButton></DeleteButton>

          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            width="32"
            height="34"
          >
            <path
              d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
              fillRule="nonzero"
            ></path>
          </svg> */}
        </button>
      </div>
    </li>
  );
}

export default TaskList;
