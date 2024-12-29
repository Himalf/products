import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth?.token && localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [auth?.token, navigate]);
  if (!auth?.token || !localStorage.getItem("token")) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="p-4 border border-red-500 bg-red-100 rounded">
          <p className="text-red-500 font-bold  text-xl">Unauthorized Access</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
