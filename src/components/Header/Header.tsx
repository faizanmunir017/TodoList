import todoLogo from "assets/todo-logo.svg"; // Adjust the number of "../" as necessary
import "./Header.css";

function Header() {
  return (
    <>
      <header className="header">
        <img
          className="logo"
          src={todoLogo}
          alt="Todo Logo"
          width={40}
          height={40}
        ></img>
        <h1 style={{ fontSize: "2em" }}>TODO</h1>
      </header>
    </>
  );
}

export default Header;
