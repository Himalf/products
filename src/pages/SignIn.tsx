import React, { useContext } from "react";
import AuthForm from "../components/AuthForm";
import { BASE_URL } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const Signin: React.FC = () => {
  const { login } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const handleSignin = async (values: { email: string; password: string }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      login(data.token);
      toast.success("Signin successful");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return <AuthForm onSubmit={handleSignin} isSignUp={false} />;
};

export default Signin;
