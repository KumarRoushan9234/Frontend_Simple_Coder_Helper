import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import { FaSearch, FaRegStopCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Typewriter } from "react-simple-typewriter";

const MessageBubble = ({ text, sender, timestamp }) => (
  <div
    className={`group p-4 rounded-md relative cursor-pointer select-text text-sm leading-relaxed
      ${
        sender === "user"
          ? "bg-[#1E40AF] text-white self-end w-3/4 ml-auto"
          : "bg-gray-700 text-white self-start w-full"
      }
    `}
    style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
  >
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          return inline ? (
            <code className="bg-gray-800 px-1 py-0.5 rounded-md">
              {children}
            </code>
          ) : (
            <SyntaxHighlighter
              style={dracula}
              language="javascript"
              PreTag="div"
              className="p-2 rounded-md"
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          );
        },
      }}
    >
      {text}
    </ReactMarkdown>

    {sender === "bot" && (
      <>
        <div className="flex justify-end">
          <div className="text-xs text-gray-400 border border-gray-600 px-2 py-1 rounded-md">
            {moment(timestamp).format("hh:mm A | DD-MM-YYYY")}
          </div>
        </div>

        {/* Copy Button only for chatbot messages */}
        <button
          className="absolute top-2 right-2 hidden group-hover:block text-xs bg-gray-900 text-white px-2 py-1 rounded"
          onClick={() => {
            navigator.clipboard.writeText(text);
            toast.success("Copied!");
          }}
        >
          Copy
        </button>
      </>
    )}
  </div>
);

const ChatInterface = () => {
  const { authUser } = useAuthStore();
  const { isSidebarOpen, askQuestion, fetchConversation } = useChatStore();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [disableInput, setDisableInput] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const streamingRef = useRef(null);

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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim()) return toast.error("Please enter a message!");

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setDisableInput(true);
    setIsStreaming(true);

    try {
      const responseText = await askQuestion(input);
      if (!responseText?.trim()) {
        toast.error("Received an empty response!");
        setDisableInput(false);
        setIsStreaming(false);
        return;
      }

      let index = 0;
      const chunkSize = 5;
      const botMessage = { sender: "bot", text: "", timestamp: new Date() };
      setMessages((prev) => [...prev, botMessage]);

      streamingRef.current = setInterval(() => {
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
          clearInterval(streamingRef.current);
          setDisableInput(false);
          setIsStreaming(false);
        }
      }, 30);
    } catch (error) {
      toast.error("Failed to get response.");
      setDisableInput(false);
      setIsStreaming(false);
    }
  }, [input, askQuestion]);

  const handleStopStreaming = () => {
    if (streamingRef.current) {
      clearInterval(streamingRef.current);
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1] = {
          ...updatedMessages[updatedMessages.length - 1],
          text: updatedMessages[updatedMessages.length - 1]?.text + "...", // Ensure full message
        };
        return updatedMessages;
      });
      setIsStreaming(false);
      setDisableInput(false);
    }
  };

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
        className="flex flex-col w-full max-w-3xl px-4 py-4 space-y-4 mb-40 overflow-y-auto"
        style={{
          height: "calc(100vh - 160px)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {messages.length === 0 ? (
          <div className="text-lg text-gray-300 mt-32 text-center font-medium">
            <Typewriter
              words={[
                `Hello ${authUser?.name || "Guest"}! What can I help you with?`,
              ]}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={1000}
            />
          </div>
        ) : (
          messages.map((msg, index) => (
            <MessageBubble
              key={index}
              text={msg.text}
              sender={msg.sender}
              timestamp={msg.timestamp}
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
            placeholder="Message Code_Helper"
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && handleSendMessage()
            }
            disabled={disableInput}
            className="w-full bg-transparent border-none outline-none text-lg text-white rounded-md resize-none overflow-y-auto disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {isStreaming ? (
            <FaRegStopCircle
              className="text-red-500 size-6 cursor-pointer"
              onClick={handleStopStreaming}
            />
          ) : (
            <FaSearch
              className="text-white size-6 cursor-pointer"
              onClick={handleSendMessage}
            />
          )}
        </div>
        <p className="text-gray-400 text-sm mt-2 text-center w-full max-w-3xl pb-2">
          LLM models can make mistakes. Recheck important info.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
