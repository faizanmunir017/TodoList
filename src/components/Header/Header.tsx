import todoLogo from "assets/todo-logo.svg";
import "./Header.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "State/userActions";
import { Navigate, useNavigate } from "react-router-dom";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser.STARTED());
    navigate("/login");
  };

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
        <button className="logout_button" onClick={handleLogout}>
          Logout
        </button>
      </header>
    </>
  );
}

export default Header;
