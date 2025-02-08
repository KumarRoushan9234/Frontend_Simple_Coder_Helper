import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate } from "react-router-dom";
import ChatInterface from "../components/ChatBox/ChatInterface";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import { useChatStore } from "../store/useChatStore";

const Home = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const { isSidebarOpen, setSidebarOpen } = useChatStore();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex min-h-screen">
        <Sidebar isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-r from-[#0c1023] to-[#181f33] text-white">
          <ChatInterface />
        </div>
      </div>
    </>
  );
};

export default Home;
