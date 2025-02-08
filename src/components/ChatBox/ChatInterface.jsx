import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import { MdUploadFile } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const ChatInterface = () => {
  const { authUser } = useAuthStore();
  const { isSidebarOpen } = useChatStore();
  const [messages, setMessages] = useState([]);

  return (
    <div
      className={`min-h-screen w-full max-w-5xl from-[#0c1023] to-[#181f33] to-[#3148bc] text-white flex flex-col px-6 pt-16 relative transition-transform duration-600 ${
        isSidebarOpen ? "translate-x-32" : "translate-x-0"
      }`}
    >
      {/* Chat Content (Scrollable) */}
      <div className="flex-1 w-full overflow-y-auto mb-20">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <TypeAnimation
              sequence={[
                `Hello ${authUser.name}!`,
                2000,
                "What can I help you with?",
                2000,
              ]}
              wrapper="h4"
              speed={50}
              className="text-3xl font-semibold"
              repeat={Infinity}
            />
          </div>
        )}
      </div>

      {/* Chat Input Box (Fixed at Bottom) */}
      <div className="w-full max-w-5xl px-10 fixed bottom-5 flex flex-col items-center">
        <div className="bg-[#1E293B] rounded-lg p-4 shadow-md w-full max-w-3xl">
          <input
            type="text"
            placeholder="Message ChatGPT"
            className="flex-1 bg-transparent border-none outline-none text-lg text-white px-2"
          />
          <div className="w-full max-w-3xl flex justify-between items-center mt-2 p-2  bg-[#1E293B] rounded-lg">
            {/* MdUploadFile icon on the left */}
            <MdUploadFile className="text-white cursor-pointer size-7" />
            {/* FaSearch icon on the right */}
            <FaSearch className="text-white cursor-pointer size-6" />
          </div>
        </div>

        {/* Icons below the input box with space padding */}

        {/* Disclaimer (Centered Below Input) */}
        <p className="text-gray-400 text-sm mt-2 text-center w-full max-w-3xl">
          ChatGPT can make mistakes. Check important info.
        </p>
      </div>

      {/* Selected Model */}
    </div>
  );
};

export default ChatInterface;
