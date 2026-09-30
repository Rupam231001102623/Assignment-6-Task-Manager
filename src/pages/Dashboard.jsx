import { Link } from "react-router-dom";

function Dashboard({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Closed"
  ).length;
  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;
  const raisedTasks = tasks.filter(
    (task) => task.status === "Raised"
  ).length;

  const highPriority = tasks.filter(
    (task) => task.priority === "High" && task.status !== "Closed"
  ).length;

  const recentTasks = [...tasks].reverse().slice(0, 5);

  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>Dashboard</h2>
          <p>Here's an overview of your tasks and productivity.</p>
        </div>

        <Link to="/add-task" className="primary-button">
          + Add New Task
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">☷</div>
          <div>
            <span>Total Tasks</span>
            <strong>{totalTasks}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">◷</div>
          <div>
            <span>Pending</span>
            <strong>{pendingTasks}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✓</div>
          <div>
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon red">!</div>
          <div>
            <span>High Priority</span>
            <strong>{highPriority}</strong>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <h3>Recent Tasks</h3>
              <p>Your latest tasks</p>
            </div>

            <Link to="/tasks">View All</Link>
          </div>

          {recentTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">☷</div>
              <h3>No tasks yet</h3>
              <p>Create your first task to get started.</p>
            </div>
          ) : (
            <div className="recent-list">
              {recentTasks.map((task) => (
                <Link
                  to={`/tasks/${task.id}`}
                  className="recent-task"
                  key={task.id}
                >
                  <div className="recent-task-info">
                    <h4>{task.header}</h4>
                    <span>
                      {task.category} · Due {task.dueDate}
                    </span>
                  </div>

                  <span
                    className={`status-badge ${task.status.toLowerCase()}`}
                  >
                    {task.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="dashboard-card overview-card">
          <div className="card-heading">
            <div>
              <h3>Task Overview</h3>
              <p>Current task status</p>
            </div>
          </div>

          <div className="progress-wrapper">
            <div className="progress-label">
              <span>Completion</span>
              <strong>
                {totalTasks
                  ? Math.round((completedTasks / totalTasks) * 100)
                  : 0}
                %
              </strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${
                    totalTasks
                      ? (completedTasks / totalTasks) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>

          <div className="overview-row">
            <span>
              <i className="dot raised"></i>
              Raised
            </span>
            <strong>{raisedTasks}</strong>
          </div>

          <div className="overview-row">
            <span>
              <i className="dot pending"></i>
              Pending
            </span>
            <strong>{pendingTasks}</strong>
          </div>

          <div className="overview-row">
            <span>
              <i className="dot completed"></i>
              Completed
            </span>
            <strong>{completedTasks}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;