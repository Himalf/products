import { toast } from "sonner";
import { BASE_URL } from "../api/api";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function SignUp({}: Props) {
  const navigate = useNavigate();
  const handleSignUp = async (values: {
    email: string;
    password: string;
    name?: string;
  }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      toast.success("Sign up successful");
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return <AuthForm onSubmit={handleSignUp} isSignUp />;
}
