import React, { useContext } from "react";
import AuthForm from "../components/AuthForm";
import { BASE_URL } from "../api/api";
import { AuthContext } from "../context/AuthContext";

const Signin: React.FC = () => {
  const { login } = useContext(AuthContext)!;

  const handleSignin = async (values: { email: string; password: string }) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/signin`, {
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
      alert("Signin successful");
    } catch (error: any) {
      alert(error.message || "Signin failed");
    }
  };

  return <AuthForm onSubmit={handleSignin} isSignUp={false} />;
};

export default Signin;
