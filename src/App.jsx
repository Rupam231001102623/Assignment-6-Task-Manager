import { Navigate, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import TaskDetails from "./pages/TaskDetails";
import CompletedTasks from "./pages/CompletedTasks";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const { user } = useAuth();

  const [tasks, setTasks] = React.useState(() => {
    const savedTasks = localStorage.getItem("taskManagerTasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [
      {
        id: "1",
        header: "Complete React Assignment",
        description:
          "Build the Task Manager application using React Router and nested routes.",
        priority: "High",
        category: "Academic",
        raisedDate: new Date().toISOString(),
        dueDate: "2026-08-28",
        status: "Pending",
      },
      {
        id: "2",
        header: "Prepare Project Presentation",
        description:
          "Prepare slides and notes for the upcoming project presentation.",
        priority: "Medium",
        category: "Academic",
        raisedDate: new Date().toISOString(),
        dueDate: "2026-08-28",
        status: "Raised",
      },
      {
        id: "3",
        header: "Buy Grocery Items",
        description:
          "Purchase necessary grocery items for the upcoming week.",
        priority: "Low",
        category: "Personal",
        raisedDate: new Date().toISOString(),
        dueDate: "2026-08-28",
        status: "Closed",
      },
    ];
  });

  const updateTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem("taskManagerTasks", JSON.stringify(newTasks));
  };

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      raisedDate: new Date().toISOString(),
      status: "Raised",
    };

    updateTasks([...tasks, newTask]);
  };

  const updateTask = (id, updatedTask) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    );

    updateTasks(newTasks);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    updateTasks(newTasks);
  };

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />

        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard tasks={tasks} />
            </ProtectedRoute>
          }
        />

        <Route
          path="tasks"
          element={
            <ProtectedRoute>
              <Tasks
                tasks={tasks}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="tasks/:id"
          element={
            <ProtectedRoute>
              <TaskDetails
                tasks={tasks}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="add-task"
          element={
            <ProtectedRoute>
              <AddTask addTask={addTask} />
            </ProtectedRoute>
          }
        />

        <Route
          path="completed"
          element={
            <ProtectedRoute>
              <CompletedTasks
                tasks={tasks}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default App;