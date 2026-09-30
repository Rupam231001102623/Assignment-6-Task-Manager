import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";

function TaskDetails({ tasks, onUpdate, onDelete }) {

  const { id } = useParams();
  const navigate = useNavigate();

  const task = tasks.find(
    (item) => item.id.toString() === id
  );

  if (!task) {
    return (
      <div className="page">
        <div className="empty-state">
          <div>❓</div>
          <h2>Task Not Found</h2>
          <p>The requested task does not exist.</p>

          <button
            className="primary-btn"
            onClick={() => navigate("/tasks")}
          >
            Back to Tasks
          </button>
        </div>
      </div>
    );
  }

  const handleUpdate = (updatedTask) => {

    onUpdate({
      ...task,
      ...updatedTask
    });

    navigate("/tasks");
  };

  return (
    <div className="page">

      <div className="details-top">

        <button
          className="back-btn"
          onClick={() => navigate("/tasks")}
        >
          ← Back to Tasks
        </button>

        <span className={`status ${task.status.toLowerCase()}`}>
          {task.status}
        </span>

      </div>

      <div className="details-layout">

        <div className="task-details">

          <div className="details-labels">

            <span className={`priority ${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>

            <span className="category">
              {task.category}
            </span>

          </div>

          <h1>{task.title}</h1>

          <p className="details-description">
            {task.description}
          </p>

          <div className="details-info">

            <div>
              <span>Raised Date & Time</span>
              <strong>{task.raisedAt}</strong>
            </div>

            <div>
              <span>Due Date</span>
              <strong>{task.dueDate}</strong>
            </div>

            <div>
              <span>Priority</span>
              <strong>{task.priority}</strong>
            </div>

            <div>
              <span>Category</span>
              <strong>{task.category}</strong>
            </div>

          </div>

          <button
            className="delete-large-btn"
            onClick={() => {
              onDelete(task.id);
              navigate("/tasks");
            }}
          >
            Delete Task
          </button>

        </div>

        <div className="edit-panel">

          <h2>Update Task</h2>
          <p>Edit task information below.</p>

          <TaskForm
            initialTask={task}
            onSubmit={handleUpdate}
          />

        </div>

      </div>

    </div>
  );
}

export default TaskDetails;