import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";

function AddTask({ onAdd }) {

  const navigate = useNavigate();

  const handleSubmit = (task) => {

    const newTask = {
      ...task,
      id: Date.now(),
      raisedAt: new Date().toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }
      ),
      dueDate: "28 Aug 2026"
    };

    onAdd(newTask);

    navigate("/tasks");
  };

  return (
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
          <div className="large-form-icon">＋</div>

          <h2>New Task</h2>

          <p>
            Fill in the details below to create a
            new task.
          </p>

          <div className="info-item">
            <span>📅</span>
            <div>
              <strong>Raised Date</strong>
              <p>Automatically generated</p>
            </div>
          </div>

          <div className="info-item">
            <span>📌</span>
            <div>
              <strong>Due Date</strong>
              <p>28 Aug 2026</p>
            </div>
          </div>

        </div>

        <TaskForm onSubmit={handleSubmit} />

      </div>

    </div>
  );
}

export default AddTask;