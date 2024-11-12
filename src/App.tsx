import LoginForm from "components/LogIn/LoginForm";
import SignUpForm from "components/SignUp/signUpForm";
import TodoList from "components/TodoList/TodoList";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/todos" element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App;
