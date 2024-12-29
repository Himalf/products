import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchWithAuth } from "../api/api"; // Function to validate the token

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const token = auth?.token || localStorage.getItem("token");
        if (token) {
          // Validate the token by calling the backend
          await fetchWithAuth("products");
        } else {
          throw new Error("No token");
        }
      } catch (error) {
        console.error("Invalid or missing token:", error);
        // Redirect to login and remember the attempted route
        navigate("/login", { state: { from: location.pathname } });
      }
    };

    validateToken();
  }, [auth?.token, navigate, location.pathname]);

  // Prevent rendering children until the token is validated
  if (!auth?.token || !localStorage.getItem("token")) {
    return null; // Do not render anything while redirecting
  }

  return <>{children}</>;
}
