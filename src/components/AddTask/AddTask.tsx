import "./AddTask.css";
import addButton from "../../assets/add-button.svg"; // Corrected path

function AddTask() {
  return (
    <>
      <form className="form">
        <label htmlFor="todo">
          <input
            type="text"
            id="todo"
            placeholder="Write your next task"
            name="todo"
          ></input>
        </label>
        <button>
          <span className="visually-hidden">Submit</span>
          <img src={addButton} alt="Todo Logo" width={32} height={32} />
        </button>
      </form>
    </>
  );
}

export default AddTask;
