import { useState } from "react";

const initialTasks = [
  {
    id: 1,
    title: "Complete React Assignment",
    description: "Complete the Task Manager assignment and prepare the project for submission.",
    priority: "High",
    category: "Academic",
    raisedAt: "30 Sep 2026, 09:30 AM",
    dueDate: "28 Aug 2026",
    status: "Pending",
  },
  {
    id: 2,
    title: "Prepare Presentation",
    description: "Prepare slides and notes for the upcoming college presentation.",
    priority: "Medium",
    category: "Academic",
    raisedAt: "29 Sep 2026, 02:15 PM",
    dueDate: "28 Aug 2026",
    status: "Raised",
  },
  {
    id: 3,
    title: "Buy Groceries",
    description: "Purchase groceries and household items for the week.",
    priority: "Low",
    category: "Personal",
    raisedAt: "28 Sep 2026, 06:45 PM",
    dueDate: "28 Aug 2026",
    status: "Closed",
  },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedTask, setSelectedTask] = useState(null);

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Academic");

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");
  const [editCategory, setEditCategory] = useState("Academic");
  const [editStatus, setEditStatus] = useState("Raised");

  const goToPage = (page) => {
    setCurrentPage(page);
    if (page !== "details") setSelectedTask(null);
  };

  const addTask = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      raisedAt: new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      dueDate: "28 Aug 2026",
      status: "Raised",
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setCategory("Academic");

    alert("Task created successfully!");
    goToPage("tasks");
  };

  const deleteTask = (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );

    goToPage("tasks");
  };

  const completeTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? { ...task, status: "Closed" } : task
      )
    );
  };

  const openDetails = (task) => {
    setSelectedTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditPriority(task.priority);
    setEditCategory(task.category);
    setEditStatus(task.status);
    setCurrentPage("details");
  };

  const updateTask = (e) => {
    e.preventDefault();

    if (!editTitle.trim() || !editDescription.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const updatedTask = {
      ...selectedTask,
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority,
      category: editCategory,
      status: editStatus,
    };

    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === selectedTask.id ? updatedTask : task
      )
    );

    setSelectedTask(updatedTask);
    alert("Task updated successfully!");
    goToPage("tasks");
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;

    const matchesCategory =
      categoryFilter === "All" || task.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    return (
      matchesSearch &&
      matchesPriority &&
      matchesCategory &&
      matchesStatus
    );
  });

  const totalTasks = tasks.length;
  const raisedTasks = tasks.filter((task) => task.status === "Raised").length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
  const completedTasks = tasks.filter((task) => task.status === "Closed").length;
  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const Navbar = () => (
    <nav className="navbar">
      <div className="nav-container">
        <div className="brand" onClick={() => goToPage("dashboard")}>
          <div className="brand-icon">✓</div>
          <div>
            <h2>TaskFlow</h2>
            <span>Task Manager</span>
          </div>
        </div>

        <div className="nav-links">
          {[
            ["dashboard", "Dashboard"],
            ["tasks", "Tasks"],
            ["add", "Add Task"],
            ["completed", "Completed"],
          ].map(([page, label]) => (
            <button
              key={page}
              className={
                currentPage === page
                  ? "nav-button active"
                  : "nav-button"
              }
              onClick={() => goToPage(page)}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          className="logout-btn"
          onClick={() => alert("This is a demo logout button.")}
        >
          Logout
        </button>
      </div>
    </nav>
  );

  const TaskCard = ({ task }) => (
    <div className="task-card">
      <div className="task-card-top">
        <div>
          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
          <span className="category">{task.category}</span>
        </div>

        <span className={`status ${task.status.toLowerCase()}`}>
          {task.status}
        </span>
      </div>

      <h3>{task.title}</h3>

      <p className="task-description">{task.description}</p>

      <div className="task-meta">
        <span>📅 Due: {task.dueDate}</span>
        <span>🕒 Raised: {task.raisedAt}</span>
      </div>

      <div className="task-actions">
        <button
          className="view-btn"
          onClick={() => openDetails(task)}
        >
          View Details
        </button>

        {task.status !== "Closed" && (
          <button
            className="complete-btn"
            onClick={() => completeTask(task.id)}
          >
            ✓ Complete
          </button>
        )}

        <button
          className="delete-btn"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="page">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Good morning 👋</h1>
          <p>Here's a quick overview of your tasks.</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => goToPage("add")}
        >
          + Add New Task
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">📋</div>
          <div>
            <span>Total Tasks</span>
            <strong>{totalTasks}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">⏳</div>
          <div>
            <span>Pending</span>
            <strong>{pendingTasks}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">📝</div>
          <div>
            <span>Raised</span>
            <strong>{raisedTasks}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✓</div>
          <div>
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <h2>Task Overview</h2>
          <p>Current status of your tasks</p>

          <div className="overview-list">
            <div>
              <span>Raised</span>
              <strong>{raisedTasks}</strong>
            </div>

            <div>
              <span>Pending</span>
              <strong>{pendingTasks}</strong>
            </div>

            <div>
              <span>Completed</span>
              <strong>{completedTasks}</strong>
            </div>
          </div>
        </div>

        <div className="dashboard-panel">
          <h2>Quick Actions</h2>
          <p>Manage your tasks quickly.</p>

          <div className="quick-actions">
            <button onClick={() => goToPage("tasks")}>
              📋 View All Tasks
            </button>

            <button onClick={() => goToPage("add")}>
              ➕ Create New Task
            </button>

            <button onClick={() => goToPage("completed")}>
              ✓ View Completed Tasks
            </button>
          </div>

          <div className="high-priority">
            <span>High Priority Tasks</span>
            <strong>{highPriorityTasks}</strong>
          </div>
        </div>
      </div>
    </div>
  );

  const TasksPage = () => (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">TASK MANAGEMENT</p>
          <h1>All Tasks</h1>
          <p>Manage and organize your tasks.</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => goToPage("add")}
        >
          + Add Task
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Academic">Academic</option>
          <option value="Personal">Personal</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
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
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );

  const AddTaskPage = () => (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">TASK MANAGEMENT</p>
          <h1>Create New Task</h1>
          <p>Add a new task to your task manager.</p>
        </div>
      </div>

      <div className="form-container">
        <div className="form-info">
          <div className="large-form-icon">+</div>
          <h2>New Task</h2>
          <p>Enter the task information and create a new task.</p>

          <div className="info-item">
            <span>🕒</span>
            <div>
              <strong>Raised Date & Time</strong>
              <p>Automatically generated</p>
            </div>
          </div>

          <div className="info-item">
            <span>📅</span>
            <div>
              <strong>Due Date</strong>
              <p>28 Aug 2026</p>
            </div>
          </div>

          <div className="info-item">
            <span>📌</span>
            <div>
              <strong>Status</strong>
              <p>New tasks start as Raised</p>
            </div>
          </div>
        </div>

        <form className="task-form" onSubmit={addTask}>
          <div className="form-group">
            <label>Task Header *</label>
            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Task Description *</label>
            <textarea
              rows="6"
              placeholder="Describe the task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

          <button type="submit" className="submit-btn">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );

  const TaskDetailsPage = () => {
    if (!selectedTask) {
      return (
        <div className="page">
          <div className="empty-state">
            <div>❓</div>
            <h2>Task Not Found</h2>
            <button
              className="primary-btn"
              onClick={() => goToPage("tasks")}
            >
              Back to Tasks
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="page">
        <div className="details-top">
          <button
            className="back-btn"
            onClick={() => goToPage("tasks")}
          >
            ← Back to Tasks
          </button>

          <span
            className={`status ${selectedTask.status.toLowerCase()}`}
          >
            {selectedTask.status}
          </span>
        </div>

        <div className="details-layout">
          <div className="task-details">
            <div className="details-labels">
              <span
                className={`priority ${selectedTask.priority.toLowerCase()}`}
              >
                {selectedTask.priority}
              </span>

              <span className="category">
                {selectedTask.category}
              </span>
            </div>

            <h1>{selectedTask.title}</h1>

            <p className="details-description">
              {selectedTask.description}
            </p>

            <div className="details-info">
              <div>
                <span>Raised Date & Time</span>
                <strong>{selectedTask.raisedAt}</strong>
              </div>

              <div>
                <span>Due Date</span>
                <strong>{selectedTask.dueDate}</strong>
              </div>

              <div>
                <span>Priority</span>
                <strong>{selectedTask.priority}</strong>
              </div>

              <div>
                <span>Category</span>
                <strong>{selectedTask.category}</strong>
              </div>
            </div>

            <button
              className="delete-large-btn"
              onClick={() => deleteTask(selectedTask.id)}
            >
              Delete Task
            </button>
          </div>

          <div className="edit-panel">
            <h2>Update Task</h2>
            <p>Edit the task information below.</p>

            <form className="task-form" onSubmit={updateTask}>
              <div className="form-group">
                <label>Task Header</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Task Description</label>
                <textarea
                  rows="5"
                  value={editDescription}
                  onChange={(e) =>
                    setEditDescription(e.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Priority</label>
                <select
                  value={editPriority}
                  onChange={(e) =>
                    setEditPriority(e.target.value)
                  }
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={editCategory}
                  onChange={(e) =>
                    setEditCategory(e.target.value)
                  }
                >
                  <option value="Academic">Academic</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  <option value="Raised">Raised</option>
                  <option value="Pending">Pending</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <button type="submit" className="submit-btn">
                Update Task
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const CompletedPage = () => {
    const completed = tasks.filter(
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

        {completed.length === 0 ? (
          <div className="empty-state">
            <div>✓</div>
            <h2>No completed tasks</h2>
            <p>Completed tasks will appear here.</p>
          </div>
        ) : (
          <div className="completed-list">
            {completed.map((task) => (
              <div className="completed-card" key={task.id}>
                <div className="completed-icon">✓</div>

                <div className="completed-content">
                  <div className="completed-heading">
                    <h3>{task.title}</h3>
                    <span className="status closed">Closed</span>
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
                  onClick={() => openDetails(task)}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderPage = () => {
    if (currentPage === "dashboard") return <Dashboard />;
    if (currentPage === "tasks") return <TasksPage />;
    if (currentPage === "add") return <AddTaskPage />;
    if (currentPage === "details") return <TaskDetailsPage />;
    if (currentPage === "completed") return <CompletedPage />;
    return <Dashboard />;
  };

  return (
    <div className="app">
      <Navbar />

      <main>{renderPage()}</main>

      <footer className="footer">
        <div>
          <strong>✓ TaskFlow</strong>
          <span>React Task Management System</span>
        </div>

        <p>© 2026 TaskFlow</p>
      </footer>
    </div>
  );
}

export default App;