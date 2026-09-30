import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("taskManagerAuth");
    navigate("/tasks");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        <div
          className="brand"
          onClick={() => navigate("/")}
        >
          <div className="brand-icon">✓</div>

          <div>
            <h2>TaskFlow</h2>
            <span>Task Manager</span>
          </div>
        </div>

        <div className="nav-links">

          <NavLink to="/">
            Dashboard
          </NavLink>

          <NavLink to="/tasks">
            Tasks
          </NavLink>

          <NavLink to="/add-task">
            Add Task
          </NavLink>

          <NavLink to="/completed">
            Completed
          </NavLink>

        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;