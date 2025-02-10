import React, { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import { CiUser } from "react-icons/ci";
import ChatBox from "./ChatBox";

const Chat = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const {
    isSidebarOpen,
    askQuestion,
    isLoading,
    response,
    fetchConversation,
    chatHistory,
  } = useChatStore();
  // console.log(chatHistory);
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
  // const message = [];
  // useEffect = () => {
  //   message = fetchConversation();
  //   console.log(message);
  // };

  return <ChatBox messages={messages} currentUser={authUser?.name || "User"} />;
};

export default Chat;
