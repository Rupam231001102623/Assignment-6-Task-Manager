import { useState } from "react";
import { Link } from "react-router-dom";

function Tasks({ tasks, updateTask, deleteTask }) {
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.header.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesPriority =
      priority === "All" || task.priority === priority;

    const matchesCategory =
      category === "All" || task.category === category;

    const matchesStatus =
      status === "All" || task.status === status;

    return (
      matchesSearch &&
      matchesPriority &&
      matchesCategory &&
      matchesStatus
    );
  });

  const handleStatusChange = (task) => {
    const newStatus =
      task.status === "Closed" ? "Pending" : "Closed";

    updateTask(task.id, {
      status: newStatus,
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
          <h2>All Tasks</h2>
          <p>View, filter and manage all your tasks.</p>
        </div>

        <Link to="/add-task" className="primary-button">
          + Add Task
        </Link>
      </div>

      <div className="filter-card">
        <div className="search-box">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Academic">Academic</option>
          <option value="Personal">Personal</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Raised">Raised</option>
          <option value="Pending">Pending</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className="task-table-card">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">⌕</div>
            <h3>No tasks found</h3>
            <p>Try changing your search or filter options.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="task-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.id}>
                    <td>
                      <div className="task-name">
                        <div className="task-check">
                          {task.status === "Closed" ? "✓" : ""}
                        </div>

                        <div>
                          <Link
                            to={`/tasks/${task.id}`}
                            className={
                              task.status === "Closed"
                                ? "task-title completed-title"
                                : "task-title"
                            }
                          >
                            {task.header}
                          </Link>

                          <small>
                            {task.description.length > 55
                              ? task.description.substring(0, 55) + "..."
                              : task.description}
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="category-badge">
                        {task.category}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`priority-badge ${task.priority.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    <td>{task.dueDate}</td>

                    <td>
                      <span
                        className={`status-badge ${task.status.toLowerCase()}`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/tasks/${task.id}`}
                          className="action-button view"
                          title="View"
                        >
                          View
                        </Link>

                        <button
                          className="action-button complete"
                          onClick={() => handleStatusChange(task)}
                        >
                          {task.status === "Closed"
                            ? "Reopen"
                            : "Complete"}
                        </button>

                        <button
                          className="action-button delete"
                          onClick={() => handleDelete(task.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;