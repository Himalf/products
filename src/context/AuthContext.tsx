import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../api/api";
import { createContext, ReactNode, useState } from "react";
interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  //   const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const login = (token: string) => {
    setToken(token);
    setAuthToken(token);
  };
  const logout = () => {
    setToken(null);
    setAuthToken(null);
  };
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
