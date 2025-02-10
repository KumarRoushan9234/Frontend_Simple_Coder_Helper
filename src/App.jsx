import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import UpgradePage from "./pages/UpgradePage";
import PreviousChat from "./components/ChatBox/PreviousChat";

const PrivateRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null; // Wait until auth status is checked
  return authUser ? children : <Navigate to="/login" replace />;
};

const AppContent = () => {
  const location = useLocation();
  const { checkAuthStatus } = useAuthStore();

  useEffect(() => {
    checkAuthStatus(); // Check auth status on mount
  }, []);

  const excludeHeaderPaths = ["/login", "/signup", "/upgrade"];
  const showHeader = !excludeHeaderPaths.includes(location.pathname);

  return (
    <div>
      {showHeader && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/previous"
          element={
            <PrivateRoute>
              <PreviousChat />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <UpgradePage />
            </PrivateRoute>
          }
        />
      </Routes>
      {/* {showHeader && <Footer />} */}
      <Toaster />
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
