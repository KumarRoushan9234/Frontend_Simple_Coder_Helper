import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
const ChatBox = ({ messages, currentUser }) => {
  return (
    <div className="p-4 max-w-lg mx-auto space-y-4 bg-white shadow-md rounded-lg">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat ${
            msg.sender === currentUser ? "chat-end" : "chat-start"
          }`}
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt={msg.sender} src={msg.avatar} />
            </div>
          </div>
          <div className="chat-header">
            {msg.sender}
            <time className="text-xs opacity-50 ml-2">{msg.time}</time>
          </div>
          <div className="chat-bubble">{msg.text}</div>
          <div className="chat-footer opacity-50">{msg.status}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
