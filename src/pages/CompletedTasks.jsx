import { useNavigate } from "react-router-dom";

function CompletedTasks({ tasks }) {

  const navigate = useNavigate();

  const completedTasks = tasks.filter(
    (task) => task.status === "Closed"
  );

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <p className="eyebrow">TASK HISTORY</p>
          <h1>Completed Tasks</h1>
          <p>Tasks that have been successfully completed.</p>
        </div>
      </div>

      {completedTasks.length === 0 ? (

        <div className="empty-state">
          <div>✓</div>
          <h2>No completed tasks</h2>
          <p>Completed tasks will appear here.</p>
        </div>

      ) : (

        <div className="completed-list">

          {completedTasks.map((task) => (

            <div
              className="completed-card"
              key={task.id}
            >

              <div className="completed-icon">
                ✓
              </div>

              <div className="completed-content">

                <div className="completed-heading">
                  <h3>{task.title}</h3>

                  <span className="status closed">
                    Closed
                  </span>
                </div>

                <p>{task.description}</p>

                <div className="completed-meta">
                  <span>{task.category}</span>
                  <span>{task.priority} Priority</span>
                  <span>Due: {task.dueDate}</span>
                </div>

              </div>

              <button
                className="view-btn"
                onClick={() =>
                  navigate(`/tasks/${task.id}`)
                }
              >
                View
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default CompletedTasks;