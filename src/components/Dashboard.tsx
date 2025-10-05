import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const { userSession, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>

        {userSession && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Welcome!</h2>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {userSession.name}
              </p>
              <p>
                <strong>Email:</strong> {userSession.email}
              </p>
            </div>
          </div>
        )}

        <Button onClick={handleLogout} className="w-full" variant="outline">
          Logout
        </Button>
      </div>
    </div>
  );
}
