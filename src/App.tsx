import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Dashboard } from "./components/Dashboard";
import { Toaster } from "./components/ui/sonner";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const GoogleAuthWrapperSignInPage = () => {
    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CI_GOOGLE_CLIENT_ID}>
        <SignIn />
      </GoogleOAuthProvider>
    );
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<GoogleAuthWrapperSignInPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
