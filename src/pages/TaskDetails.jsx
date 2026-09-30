import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function TaskDetails({ tasks, updateTask, deleteTask }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = tasks.find((item) => item.id === id);

  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState(
    task || {
      header: "",
      description: "",
      priority: "Medium",
      category: "Academic",
      dueDate: "2026-08-28",
    }
  );

  if (!task) {
    return (
      <div className="not-found">
        <div className="not-found-icon">?</div>
        <h2>Task Not Found</h2>
        <p>The task you are looking for does not exist.</p>
        <Link to="/tasks" className="primary-button">
          Back to Tasks
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = () => {
    updateTask(task.id, {
      header: editData.header,
      description: editData.description,
      priority: editData.priority,
      category: editData.category,
      dueDate: editData.dueDate,
    });

    setIsEditing(false);
  };

  const toggleStatus = () => {
    updateTask(task.id, {
      status: task.status === "Closed" ? "Pending" : "Closed",
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id);
      navigate("/tasks");
    }
  };

  return (
    <div>
      <div className="breadcrumb">
        <Link to="/tasks">Tasks</Link>
        <span>/</span>
        <span>{task.header}</span>
      </div>

      <div className="details-card">
        <div className="details-header">
          <div>
            <span
              className={`status-badge ${task.status.toLowerCase()}`}
            >
              {task.status}
            </span>

            {isEditing ? (
              <input
                className="edit-title"
                name="header"
                value={editData.header}
                onChange={handleChange}
              />
            ) : (
              <h2>{task.header}</h2>
            )}

            <p>
              Created on{" "}
              {new Date(task.raisedDate).toLocaleString()}
            </p>
          </div>

          <div className="details-actions">
            <button
              className="secondary-button"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Task"}
            </button>

            <button
              className="danger-button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>

        <div className="details-content">
          <div className="details-section">
            <h3>Description</h3>

            {isEditing ? (
              <textarea
                name="description"
                rows="6"
                value={editData.description}
                onChange={handleChange}
              ></textarea>
            ) : (
              <p className="description-text">
                {task.description}
              </p>
            )}
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <span>Priority</span>

              {isEditing ? (
                <select
                  name="priority"
                  value={editData.priority}
                  onChange={handleChange}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              ) : (
                <strong
                  className={`priority-badge ${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </strong>
              )}
            </div>

            <div className="detail-item">
              <span>Category</span>

              {isEditing ? (
                <select
                  name="category"
                  value={editData.category}
                  onChange={handleChange}
                >
                  <option value="Academic">Academic</option>
                  <option value="Personal">Personal</option>
                </select>
              ) : (
                <strong>{task.category}</strong>
              )}
            </div>

            <div className="detail-item">
              <span>Raised Date</span>
              <strong>
                {new Date(task.raisedDate).toLocaleDateString()}
              </strong>
            </div>

            <div className="detail-item">
              <span>Due Date</span>

              {isEditing ? (
                <input
                  type="date"
                  name="dueDate"
                  value={editData.dueDate}
                  onChange={handleChange}
                />
              ) : (
                <strong>{task.dueDate}</strong>
              )}
            </div>
          </div>
        </div>

        <div className="details-footer">
          {isEditing ? (
            <button
              className="primary-button"
              onClick={saveChanges}
            >
              Save Changes
            </button>
          ) : (
            <button
              className="primary-button"
              onClick={toggleStatus}
            >
              {task.status === "Closed"
                ? "Reopen Task"
                : "Mark as Completed"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;