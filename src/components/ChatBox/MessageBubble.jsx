import React from "react";

const MessageBubble = ({ text, sender }) => {
  if (!text) return null;

  return (
    <div
      className={`p-3 rounded-md transition-all ${
        sender === "user"
          ? "bg-blue-600 self-end text-white w-3/5 ml-auto hover:bg-blue-700"
          : "bg-gray-700 self-start text-white w-full hover:bg-gray-600"
      }`}
    >
      {text}
    </div>
  );
};

export default MessageBubble;
