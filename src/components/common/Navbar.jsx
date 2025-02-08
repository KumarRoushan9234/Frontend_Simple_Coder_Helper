import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { IoLogOut, IoSettings } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineWechatWork } from "react-icons/ai";
import { useChatStore } from "../../store/useChatStore";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { isSidebarOpen, setSidebarOpen } = useChatStore();
  const { logout } = useAuthStore();

  return (
    <>
      <div className="navbar bg-[#09090c] text-white px-4 fixed top-0 w-full z-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-6 w-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <Link to="/" className="btn btn-ghost text-xl">
            Code_Helper
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-square btn-ghost"
            >
              <FaRegUserCircle className="text-2xl" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile">
                  <IoSettings />
                  <span>Settings</span>
                </Link>
              </li>
              <li>
                <a>
                  <AiOutlineWechatWork />
                  Temporary Chat
                  <input type="checkbox" className="toggle" defaultChecked />
                </a>
              </li>
            </ul>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="btn btn-square btn-ghost text-red-500 hover:text-red-700"
          >
            <IoLogOut className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
    </>
  );
};

export default Navbar;
