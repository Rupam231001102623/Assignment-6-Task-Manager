import { useState } from "react";
import TaskCard from "../components/TaskCard";

function Tasks({ tasks, onDelete, onComplete }) {

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.title.toLowerCase().includes(
        search.toLowerCase()
      ) ||
      task.description.toLowerCase().includes(
        search.toLowerCase()
      );

    const matchesPriority =
      priority === "All" ||
      task.priority === priority;

    const matchesCategory =
      category === "All" ||
      task.category === category;

    const matchesStatus =
      status === "All" ||
      task.status === status;

    return (
      matchesSearch &&
      matchesPriority &&
      matchesCategory &&
      matchesStatus
    );
  });

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <p className="eyebrow">TASK MANAGEMENT</p>
          <h1>All Tasks</h1>
          <p>Manage and organize your tasks.</p>
        </div>
      </div>

      <div className="filters">

        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

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

      <div className="task-count">
        Showing {filteredTasks.length} task
        {filteredTasks.length !== 1 ? "s" : ""}
      </div>

      {filteredTasks.length === 0 ? (

        <div className="empty-state">
          <div>📭</div>
          <h2>No tasks found</h2>
          <p>Try changing your filters or create a new task.</p>
        </div>

      ) : (

        <div className="task-grid">

          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onComplete={onComplete}
            />
          ))}

        </div>

      )}

    </div>
  );
}

export default Tasks;