import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { CiUser } from "react-icons/ci";
import ChatBox from "./ChatBox";

const Chat = () => {
  const authUser = useAuthStore((state) => state.authUser);

  const messages = [
    {
      sender: authUser?.name || "User",
      avatar: authUser?.avatar || <CiUser />,
      text: "Hello, chatbot!",
      time: "12:45",
      status: "Sent",
    },
    {
      sender: "ChatBot",
      avatar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      text: "Hi there! How can I assist you?",
      time: "12:46",
      status: "Delivered",
    },
  ];

  return <ChatBox messages={messages} currentUser={authUser?.name || "User"} />;
};

export default Chat;
