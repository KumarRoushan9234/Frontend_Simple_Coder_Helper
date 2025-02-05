import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import SignupPage from "./pages/auth/SignUp";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <RouteContent />
    </Router>
  );
}

function RouteContent() {
  const location = useLocation();

  const excludeHeaderPaths = ["/login", "/signup"];
  const showHeader = !excludeHeaderPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {showHeader && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route
            path="/login"
            element={<LoginPage />}
            // element={!authUser ? <LoginPage /> : <Navigate to="/home" />}
          />
          <Route
            path="/signup"
            element={<SignupPage />}
            // element={!authUser ? <SignupPage /> : <Navigate to="/" />}
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      {showHeader && <Footer />}
      <Toaster />
    </div>
  );
}

export default App;
