import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useGoogleLogin, type CodeResponse } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignIn = () => {
  const navigate = useNavigate();
  const [_error, setError] = useState("");
  const { googleLogin } = useAuth();

  const handleGoogleSuccess = async (codeResponse: CodeResponse) => {
    try {
      const success = await googleLogin(codeResponse);

      if (success) {
        await new Promise((resolve) => setTimeout(resolve, 100));

        toast.success("Welcome back!", {
          description: "You have successfully signed in.",
        });
        navigate("/dashboard", { replace: true });
      } else {
        localStorage.removeItem("userInfo");
        setError("Failed to login");
        toast.error("Sign in failed", {
          description: "Failed to login with Google. Please try again.",
        });
      }
    } catch (err) {
      localStorage.removeItem("userInfo");
      console.error(err);
      toast.error("Login failed", {
        description: "Failed to login with Google. Please try again.",
      });
    }
  };

  const handleGoogleError = (
    errorResponse: Pick<
      CodeResponse,
      "error" | "error_description" | "error_uri"
    >
  ) => {
    console.error(errorResponse);
    toast.error("Login failed", {
      description: "Failed to login with Google. Please try again.",
    });
  };

  const handleGoogleAuthentication = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
    flow: "auth-code",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome</h1>
        <p className="text-center text-gray-600 mb-6">
          Sign in with your Google account to continue
        </p>
        <Button onClick={handleGoogleAuthentication} className="w-full">
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
