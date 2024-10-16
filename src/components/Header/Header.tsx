import todoLogo from "./assets/todo-logo.svg";

function Header() {
  return (
    <>
      <header>
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
