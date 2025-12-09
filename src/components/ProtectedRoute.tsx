import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLogout={handleLogout} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedRoute;
