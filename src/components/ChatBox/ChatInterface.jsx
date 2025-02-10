import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";

const MessageBubble = ({ text, sender }) => (
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

    {/* Copy Button */}
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

  const handleInputChange = (e) => {
    setInput(e.target.value);

    // Dynamically adjust height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      const newHeight = Math.min(textareaRef.current.scrollHeight, 160); // Max height 160px
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  const handleSendMessage = useCallback(async () => {
    if (!input.trim()) return toast.error("Please enter a message!");

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setDisableInput(true);

    try {
      const responseText = await askQuestion(input);

      if (!responseText?.trim()) {
        toast.error("Received an empty response!");
        setDisableInput(false);
        return;
      }

      // Streaming response in chunks
      let index = 0;
      const chunkSize = 5;
      const botMessage = { sender: "bot", text: "" };
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

          // Ensure auto-scrolling while streaming
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

  // Auto scroll to bottom when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`relative flex flex-col items-center w-full max-w-5xl min-h-screen from-[#0c1023] to-[#181f33] text-white ${
        isSidebarOpen ? "translate-x-32" : "translate-x-0"
      }`}
      style={{ paddingTop: "60px" }}
    >
      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        className="flex flex-col w-full max-w-3xl px-4 py-4 space-y-4 mb-40 overflow-hidden"
        style={{ maxHeight: "calc(100vh - 160px)" }}
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-lg text-gray-300">
            {`Hello ${authUser?.name || "Guest"}! What can I help you with?`}
          </div>
        ) : (
          messages.map((msg, index) => (
            <MessageBubble key={index} text={msg.text} sender={msg.sender} />
          ))
        )}

        {/* Auto-scroll target */}
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed Input Box */}
      <div className="fixed bottom-0 left-0 right-0 w-full shadow-lg z-50 flex flex-col items-center p-4 rounded-t-lg">
        {/* Input & Buttons */}
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
            className="w-full bg-transparent border-none outline-none text-lg text-white rounded-md resize-none overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              minHeight: "80px",
              maxHeight: "160px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          />
          {/* Hide scrollbar for Chrome, Safari, Edge */}
          <style>
            {`
              textarea::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <FaSearch
            className="text-white size-6 cursor-pointer"
            onClick={handleSendMessage}
          />
        </div>

        {/* Disclaimer */}
        <p className="text-gray-400 text-sm mt-2 text-center w-full max-w-3xl pb-2">
          LLM models can make mistakes. Recheck important info.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;

// Customizable Parameters
// Parameter	Purpose	Suggested Value
// chunkSize	Number of characters to show per update	10 (for smoother flow)
// interval time	Speed of chunk updates	30ms (for fast streaming)
// 🔹 Want even bigger chunks? Set chunkSize = 20 for faster responses.
// 🔹 Want instant response? Set interval time = 10ms.
