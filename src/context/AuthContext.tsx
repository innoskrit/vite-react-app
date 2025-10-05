import { signInByGoogle, signIn } from "@/api/auth";
import type { SignInRequest } from "@/types/auth";
import type { UserSession } from "@/types/user-session";
import type { CodeResponse } from "@react-oauth/google";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface AuthContextType {
  userSession: UserSession | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  googleLogin: (codeResponse: CodeResponse) => Promise<boolean>;
  login: (signInRequest: SignInRequest) => Promise<boolean>;
  logout: () => void;
}

const getRoleFromToken = (token: string): string => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role || "user";
  } catch {
    return "user";
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userSession, setUserSession] = useState<UserSession | null>(() => {
    const storedUserSession = localStorage.getItem("userSession");
    return storedUserSession ? JSON.parse(storedUserSession) : null;
  });

  // to handle if user is signed in two different tabs and tries to logout, this will logout from both tabs
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "userSession") {
        setUserSession(event.newValue ? JSON.parse(event.newValue) : null);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const googleLogin = async (codeResponse: CodeResponse): Promise<boolean> => {
    try {
      const response = await signInByGoogle(codeResponse.code);
      console.log(response.data);
      const { email, name, token } = response.data;
      setUserSession({ email, name, token });
      localStorage.setItem(
        "userSession",
        JSON.stringify({ email, name, token })
      );
      return true;
    } catch (error) {
      throw error;
    }
  };

  const login = async (signInRequest: SignInRequest): Promise<boolean> => {
    try {
      const response = await signIn(signInRequest);
      const { email, name, token } = response.data;
      setUserSession({ email, name, token });
      localStorage.setItem(
        "userSession",
        JSON.stringify({ email, name, token })
      );
      return true;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUserSession(null);
    localStorage.removeItem("userSession");
  };

  const value = {
    userSession,
    isAuthenticated: !!userSession,
    isAdmin: userSession
      ? getRoleFromToken(userSession.token) === "admin"
      : false,
    login,
    googleLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
