import todoLogo from "assets/todo-logo.svg";
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
      <header className="flex items-center justify-between gap-[12px] p-[42px]">
        <div className="flex items-center">
          <img
            className="logo"
            src={todoLogo}
            alt="Todo Logo"
            width={40}
            height={40}
          ></img>
          <h1 style={{ fontSize: "2em" }}>TODO</h1>
        </div>

        <button
          className=" p-[9px]  bg-green-800 text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>
    </>
  );
}

export default Header;
