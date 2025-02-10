import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import moment from "moment";

const MessageBubble = ({ text, sender, timestamp, isLast }) => (
  <div
    className={`group p-3 rounded-md relative cursor-pointer select-text 
      ${
        sender === "user"
          ? "bg-[#1E40AF] self-end text-white w-3/4 ml-auto"
          : "bg-gray-700 self-start text-white w-full"
      }
    `}
    style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
  >
    <div>{text}</div>

    {sender === "bot" && (
      <>
        <div className="flex justify-end">
          <div className="text-xs text-gray-400 border border-gray-600 px-2 py-1 rounded-md">
            {moment(timestamp).format("hh:mm A | DD-MM-YYYY")}
          </div>
        </div>
        {!isLast && <div className="border-b border-gray-600 my-2"></div>}
      </>
    )}

    <button
      className="absolute top-2 right-2 hidden group-hover:block text-xs bg-gray-900 text-white px-2 py-1 rounded"
      onClick={() => {
        navigator.clipboard.writeText(text);
        toast.success("Copied!");
      }}
    >
      Copy
    </button>
  </div>
);

const ChatInterface = () => {
  const { authUser } = useAuthStore();
  const { isSidebarOpen, askQuestion, fetchConversation } = useChatStore();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [disableInput, setDisableInput] = useState(false);
  const [typingText, setTypingText] = useState(""); // Typing effect state

  const textareaRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadMessages = async () => {
      const response = await fetchConversation();
      if (response?.data?.length) {
        setMessages(response.data);
      }
    };
    loadMessages();
  }, []);

  useEffect(() => {
    // Auto-scroll to the bottom when messages update
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      let dots = 0;
      const typingInterval = setInterval(() => {
        setTypingText(
          `Hello ${
            authUser?.name || "Guest"
          }! What can I help you with${".".repeat(dots)} `
        );
        dots = (dots + 1) % 4;
      }, 500); // Change dots every 500ms

      return () => clearInterval(typingInterval);
    }
  }, [messages, authUser]);

  const handleInputChange = (e) => {
    setInput(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      const newHeight = Math.min(textareaRef.current.scrollHeight, 160);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  const handleSendMessage = useCallback(async () => {
    if (!input.trim()) return toast.error("Please enter a message!");

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setDisableInput(true);

    // Reset textarea height
    if (textareaRef.current) textareaRef.current.style.height = "80px";

    try {
      const responseText = await askQuestion(input);

      if (!responseText?.trim()) {
        toast.error("Received an empty response!");
        setDisableInput(false);
        return;
      }

      let index = 0;
      const chunkSize = 5;
      const botMessage = { sender: "bot", text: "", timestamp: new Date() };
      setMessages((prev) => [...prev, botMessage]);

      const interval = setInterval(() => {
        if (index < responseText.length) {
          setMessages((prev) => {
            const updatedMessages = [...prev];
            updatedMessages[updatedMessages.length - 1] = {
              ...updatedMessages[updatedMessages.length - 1],
              text: responseText.slice(0, index + chunkSize),
            };
            return updatedMessages;
          });

          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 10);

          index += chunkSize;
        } else {
          clearInterval(interval);
          setDisableInput(false);
        }
      }, 30);
    } catch (error) {
      toast.error("Failed to get response.");
      setDisableInput(false);
    }
  }, [input, askQuestion]);

  return (
    <div
      className={`relative flex flex-col items-center w-full max-w-5xl min-h-screen from-[#0c1023] to-[#181f33] text-white ${
        isSidebarOpen ? "translate-x-32" : "translate-x-0"
      }`}
      style={{ paddingTop: "60px" }}
    >
      {/* Messages Container (No Scrollbar) */}
      <div
        ref={messagesContainerRef}
        className="flex flex-col w-full max-w-3xl px-4 py-4 space-y-4 mb-40 overflow-auto flex-grow items-center justify-center"
        style={{
          maxHeight: "calc(100vh - 160px)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {messages.length === 0 ? (
          <div className="text-lg text-gray-300 text-center font-medium">
            {typingText}
          </div>
        ) : (
          messages.map((msg, index) => (
            <MessageBubble
              key={index}
              text={msg.text}
              sender={msg.sender}
              timestamp={msg.timestamp}
              isLast={index === messages.length - 1}
            />
          ))
        )}

        {/* Auto-scroll target */}
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed Input Box */}
      <div className="fixed bottom-0 left-0 right-0 w-full shadow-lg z-50 flex flex-col items-center p-4 rounded-t-lg">
        <div className="w-full max-w-3xl flex items-center bg-[#1E293B] rounded-lg p-4 shadow-md">
          <textarea
            ref={textareaRef}
            placeholder="Message Code_Helper"
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && handleSendMessage()
            }
            disabled={disableInput}
            className="w-full bg-transparent border-none outline-none text-lg text-white rounded-md resize-none overflow-y-auto disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              minHeight: "80px",
              maxHeight: "120px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          />
          <FaSearch
            className="text-white size-6 cursor-pointer"
            onClick={handleSendMessage}
          />
        </div>
        <p className="text-gray-400 text-sm mt-2 text-center w-full max-w-3xl pb-2">
          LLM models can make mistakes. Recheck important info.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
