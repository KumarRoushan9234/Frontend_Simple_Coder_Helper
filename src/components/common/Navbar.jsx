import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <header className="flex justify-between items-center p-4 bg-gray-900">
      <h1 className="text-2xl font-bold">Code_Helper</h1>
      {authUser ? (
        <button
          onClick={() => logout()}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>
      ) : (
        <div>
          <Link to="/login" className="mr-4 text-blue-400 hover:text-blue-600">
            Login
          </Link>
          <Link to="/signup" className="text-blue-400 hover:text-blue-600">
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
