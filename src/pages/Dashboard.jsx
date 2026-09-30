import { useNavigate } from "react-router-dom";

function Dashboard({ tasks }) {

  const navigate = useNavigate();

  const total = tasks.length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const raised = tasks.filter(
    (task) => task.status === "Raised"
  ).length;

  const completed = tasks.filter(
    (task) => task.status === "Closed"
  ).length;

  const highPriority = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  return (
    <div className="page">

      <div className="dashboard-header">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Good morning 👋</h1>
          <p>
            Here's a quick overview of your tasks.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("/add-task")}
        >
          + Add New Task
        </button>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon blue">📋</div>
          <div>
            <span>Total Tasks</span>
            <strong>{total}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">⏳</div>
          <div>
            <span>Pending</span>
            <strong>{pending}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">📝</div>
          <div>
            <span>Raised</span>
            <strong>{raised}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✓</div>
          <div>
            <span>Completed</span>
            <strong>{completed}</strong>
          </div>
        </div>

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <h2>Task Overview</h2>
              <p>Your current task status</p>
            </div>
          </div>

          <div className="overview-list">

            <div>
              <span>Raised</span>
              <strong>{raised}</strong>
            </div>

            <div>
              <span>Pending</span>
              <strong>{pending}</strong>
            </div>

            <div>
              <span>Completed</span>
              <strong>{completed}</strong>
            </div>

          </div>
        </div>

        <div className="dashboard-panel">

          <h2>Quick Actions</h2>
          <p>Manage your tasks quickly.</p>

          <div className="quick-actions">

            <button onClick={() => navigate("/tasks")}>
              📋 View All Tasks
            </button>

            <button onClick={() => navigate("/add-task")}>
              ➕ Create Task
            </button>

            <button onClick={() => navigate("/completed")}>
              ✓ Completed Tasks
            </button>

          </div>

          <div className="high-priority">
            <span>High Priority Tasks</span>
            <strong>{highPriority}</strong>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;