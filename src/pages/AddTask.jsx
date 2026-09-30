import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTask({ addTask }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    header: "",
    description: "",
    priority: "Medium",
    category: "Academic",
    dueDate: "2026-08-28",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.header.trim()) {
      setError("Please enter a task header.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Please enter a task description.");
      return;
    }

    addTask(formData);
    navigate("/tasks");
  };

  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>Add New Task</h2>
          <p>Create a new task and keep your work organized.</p>
        </div>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}

          <div className="form-group">
            <label>Task Header *</label>
            <input
              type="text"
              name="header"
              placeholder="Enter task title"
              value={formData.header}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Task Description *</label>
            <textarea
              name="description"
              placeholder="Describe your task..."
              rows="5"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Academic">Academic</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Raised Date & Time</label>
              <input
                type="text"
                value={new Date().toLocaleString()}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/tasks")}
            >
              Cancel
            </button>

            <button type="submit" className="primary-button">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;