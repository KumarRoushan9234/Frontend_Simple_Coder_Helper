import React, { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

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

    <div className="flex justify-end">
      <div className="text-xs text-gray-400 border border-gray-600 px-2 py-1 rounded-md">
        {moment(timestamp).format("hh:mm A | DD-MM-YYYY")}
      </div>
    </div>
  </div>
);

const PreviousChat = () => {
  const { chatHistory, fetchConversation } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    fetchConversation();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#161e26]">
      <div className="p-6 mt-16 mb-9 bg-[#1f2c39] w-full max-w-5xl text-white rounded-lg border shadow-lg">
        <h2 className="text-center text-lg font-bold bg-[#1f2c39] py-3 rounded-md">
          Previous Chats
        </h2>

        {chatHistory.length > 0 ? (
          <div className="mt-6 space-y-6 border-t border-gray-500 pt-4">
            {chatHistory.map((msg, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <MessageBubble
                  text={msg.user}
                  sender="user"
                  timestamp={msg.timestamp}
                />
                <MessageBubble
                  text={msg.assistant}
                  sender="bot"
                  timestamp={msg.timestamp}
                />

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
