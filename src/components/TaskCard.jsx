import { useNavigate } from "react-router-dom";

function TaskCard({ task, onDelete, onComplete }) {
  const navigate = useNavigate();

  return (
    <div className="task-card">

      <div className="task-card-top">

        <div>
          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>

          <span className="category">
            {task.category}
          </span>
        </div>

        <span className={`status ${task.status.toLowerCase()}`}>
          {task.status}
        </span>

      </div>

      <h3>{task.title}</h3>

      <p className="task-description">
        {task.description}
      </p>

      <div className="task-meta">
        <span>
          📅 Due: {task.dueDate}
        </span>

        <span>
          🕒 {task.raisedAt}
        </span>
      </div>

      <div className="task-actions">

        <button
          className="view-btn"
          onClick={() => navigate(`/tasks/${task.id}`)}
        >
          View Details
        </button>

        {task.status !== "Closed" && (
          <button
            className="complete-btn"
            onClick={() => onComplete(task.id)}
          >
            ✓ Complete
          </button>
        )}

        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;