import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate } from "react-router-dom"; // Import Navigate
import Sidebar from "../components/common/Sidebar";
import ChatContent from "../components/ChatContent/ChatContent";

const HomePage = () => {
  const { authUser } = useAuthStore();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Redirect to login page if not authenticated
  if (!authUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar: Hidden on mobile, shown on larger screens */}
      {!isMobile && authUser && (
        <div className="w-[300px] bg-gray-800 text-white h-screen fixed top-0 left-0 p-4">
          <Sidebar />
        </div>
      )}

      {/* Main Chat Area */}
      <div
        className={`flex-1 p-4 transition-all ${
          isMobile ? "ml-0" : "ml-[300px]"
        }`}
      >
        {authUser ? (
          <ChatContent isMobile={isMobile} />
        ) : (
          <div className="flex justify-center items-center h-full text-gray-700">
            <h2 className="text-2xl font-semibold">
              Welcome! Please log in to start chatting.
            </h2>
          </div>
        )}
      </div>

      {/* Mobile Chat Overlay */}
      {isMobile && authUser && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="w-full h-full bg-gray-900 text-white p-6">
            <ChatContent isMobile={isMobile} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
