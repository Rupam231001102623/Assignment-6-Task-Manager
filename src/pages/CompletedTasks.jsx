import { Link } from "react-router-dom";

function CompletedTasks({ tasks, updateTask, deleteTask }) {
  const completedTasks = tasks.filter(
    (task) => task.status === "Closed"
  );

  const reopenTask = (id) => {
    updateTask(id, {
      status: "Pending",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(id);
    }
  };

  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>Completed Tasks</h2>
          <p>Review the tasks you have successfully completed.</p>
        </div>
      </div>

      {completedTasks.length === 0 ? (
        <div className="empty-large">
          <div className="empty-icon completed-empty">✓</div>
          <h3>No completed tasks</h3>
          <p>
            Tasks marked as completed will appear here.
          </p>

          <Link to="/tasks" className="primary-button">
            View All Tasks
          </Link>
        </div>
      ) : (
        <div className="completed-grid">
          {completedTasks.map((task) => (
            <div className="completed-card" key={task.id}>
              <div className="completed-top">
                <div className="completed-check">✓</div>

                <span
                  className={`priority-badge ${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>
              </div>

              <h3>{task.header}</h3>

              <p>{task.description}</p>

              <div className="completed-meta">
                <span>{task.category}</span>
                <span>Due {task.dueDate}</span>
              </div>

              <div className="completed-actions">
                <Link
                  to={`/tasks/${task.id}`}
                  className="action-button view"
                >
                  View
                </Link>

                <button
                  className="action-button complete"
                  onClick={() => reopenTask(task.id)}
                >
                  Reopen
                </button>

                <button
                  className="action-button delete"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CompletedTasks;