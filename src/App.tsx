import { NavigateFunction, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import CreateTaskPage from "./pages/create-task";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import TasksPage from "./pages/tasks";

function App() {
  const navigate: NavigateFunction = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<SignInPage navigate={navigate} />} />
      <Route path="/signin" element={<SignInPage navigate={navigate} />} />
      <Route path="/signup" element={<SignUpPage navigate={navigate} />} />
      <Route path="/tasks" element={<TasksPage navigate={navigate} />} />
      <Route
        path="/tasks/create"
        element={<CreateTaskPage navigate={navigate} />}
      />
    </Routes>
  );
}

export default App;
