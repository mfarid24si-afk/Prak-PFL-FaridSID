import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

export function ProtectedRoute({ children, requiredRole }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === "admin" && profile?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export function AdminRoute({ children }) {
  return <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>;
}
