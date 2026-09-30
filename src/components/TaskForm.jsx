import { useState } from "react";

function TaskForm({ onSubmit, initialTask }) {

  const [title, setTitle] = useState(
    initialTask?.title || ""
  );

  const [description, setDescription] = useState(
    initialTask?.description || ""
  );

  const [priority, setPriority] = useState(
    initialTask?.priority || "Medium"
  );

  const [category, setCategory] = useState(
    initialTask?.category || "Academic"
  );

  const [status, setStatus] = useState(
    initialTask?.status || "Raised"
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    onSubmit({
      title,
      description,
      priority,
      category,
      status
    });
  };

  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
    >

      <div className="form-group">
        <label>Task Header</label>

        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Task Description</label>

        <textarea
          placeholder="Describe the task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
          required
        />
      </div>

      <div className="form-row">

        <div className="form-group">
          <label>Priority</label>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Academic">Academic</option>
            <option value="Personal">Personal</option>
          </select>
        </div>

      </div>

      {initialTask && (
        <div className="form-group">
          <label>Status</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Raised">Raised</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      )}

      <button
        type="submit"
        className="submit-btn"
      >
        {initialTask ? "Update Task" : "Create Task"}
      </button>

    </form>
  );
}

export default TaskForm;