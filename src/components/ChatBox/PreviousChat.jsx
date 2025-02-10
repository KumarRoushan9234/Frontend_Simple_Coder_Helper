import React, { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";

const PreviousChat = () => {
  const { chatHistory, fetchConversation } = useChatStore();
  const { authUser } = useAuthStore();
  // ✅ Fetch conversation only once when the component mounts
  useEffect(() => {
    fetchConversation();
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#161e26]">
      <div className="p-6 mt-10 bg-[#1f2c39] w-full max-w-5xl text-white rounded-lg border shadow-lg">
        <h2 className="text-center text-lg border-spacing-6 font-bold bg-[#1f2c39] py-3 rounded-md">
          Previous Chats
        </h2>

        {/* Chat History List */}
        <div className="mt-4 space-y-4 border-collapse">
          {chatHistory.length > 0 ? (
            chatHistory.map((msg, index) => (
              <div key={index} className="flex flex-col space-y-2">
                {/* User Message (Right-Aligned, 3/4 Width) */}
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white p-3 rounded-lg border border-blue-400 w-3/4 shadow-md">
                    <p className="font-semibold">{authUser?.name || "User"}:</p>
                    <p>{msg.user}</p>
                  </div>
                </div>

                {/* AI Message (Full Width) */}
                <div className="bg-green-700 text-white p-3 rounded-lg border border-green-500 w-full shadow-md">
                  <p className="font-semibold">AI:</p>
                  <p>{msg.assistant}</p>
                </div>

                {/* Timestamp (Bottom Right) */}
                <div className="flex justify-end">
                  <div className="text-xs text-gray-400 border border-gray-600 px-2 py-1 rounded-md">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">
              No previous chats found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviousChat;
