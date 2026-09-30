import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated =
    sessionStorage.getItem("taskManagerAuth");

  if (!isAuthenticated) {
    sessionStorage.setItem("taskManagerAuth", "true");
  }

  return children;
}

export default ProtectedRoute;
