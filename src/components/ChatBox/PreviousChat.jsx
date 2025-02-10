import React, { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import moment from "moment"; // Import moment for date-time formatting

const PreviousChat = () => {
  const { chatHistory, fetchConversation } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    fetchConversation();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#161e26]">
      <h2 className="text-center text-lg font-bold bg-[#1f2c39] py-3 rounded-md">
        Previous Chats
      </h2>
      <div className="p-6 mt-16 mb-9 bg-[#1f2c39] w-full max-w-5xl text-white rounded-lg border shadow-lg">
        {/* Separate Chat History Section */}
        {chatHistory.length > 0 ? (
          <div className="mt-6 space-y-6 border-t border-gray-500 pt-4">
            {chatHistory.map((msg, index) => (
              <div key={index} className="flex flex-col space-y-3">
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
                    {moment(msg.timestamp).format("hh:mm A | DD-MM-YYYY")}
                  </div>
                </div>

                {/* Divider for separation */}
                {index !== chatHistory.length - 1 && (
                  <div className="border-b border-gray-600 my-2"></div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-4">
            No previous chats found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PreviousChat;
