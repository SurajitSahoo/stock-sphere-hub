import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "./Auth";

const Index = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return <Auth />;
};

export default Index;
