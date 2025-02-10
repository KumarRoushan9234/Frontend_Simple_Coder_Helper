import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";
import { GiConversation } from "react-icons/gi";
import { useChatStore } from "../../store/useChatStore";

const Sidebar = ({ isOpen, setSidebarOpen }) => {
  const { selectedModel, setModel, selectModel, clearConversation } =
    useChatStore();

  const [searchTerm, setSearchTerm] = useState(""); // for search input
  const [isSearchActive, setIsSearchActive] = useState(false); // flag to toggle search

  const models = [
    "mixtral-8x7b-32768",
    "llama-3.3-70b-specdec",
    "llama-3.3-70b-versatile",
    "llama3-8b-8192",
    "llama-guard-3-8b",
    "llama3-70b-8192",
    "llama-3.2-1b-preview",
    "whisper-large-v3-turbo",
    "llama-3.2-3b-preview",
    "llama-guard-3-8b",
    "gemma2-9b-it",
    "distil-whisper-large-v3-en",
  ];

  // Filter models based on the search term
  const filteredModels = models.filter((model) =>
    model.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handelClearConversation = () => {
    clearConversation();
  };
  // useEffect = () => {};

  // Handle model change
  const handleModelChange = (model) => {
    setModel(model); // Update the selected model in the store
    selectModel(model);
    setIsSearchActive(false); // Close the dropdown after selection
    setSearchTerm(""); // Reset the search term
  };

  return (
    <div
      className={`fixed left-0 top-16 h-[calc(100%-4rem)] w-80 bg-[#15171e] text-[#EAEAEA] shadow-lg z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      {/* Model Selection */}
      <div className="p-4">
        <label className="block text-sm text-gray-400 mb-1">Select Model</label>
        <div className="relative">
          {/* Dropdown button */}
          <button
            onClick={() => setIsSearchActive(!isSearchActive)} // Toggle search dropdown
            className="w-full bg-gradient-to-r from-[#374151] to-[#1E293B] text-white px-3 py-2 rounded-lg focus:outline-none border border-gray-600"
          >
            {selectedModel || "Select Model"}
          </button>

          {isSearchActive && (
            <div
              className="absolute left-0 right-0 mt-2 bg-[#374151] border border-gray-600 rounded-lg max-h-56 overflow-auto"
              style={{ zIndex: 100 }}
            >
              {/* Search input */}
              <input
                type="text"
                placeholder="Search models..."
                className="w-full bg-[#374151] text-white px-3 py-2 rounded-t-lg focus:outline-none border-b border-gray-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ul className="max-h-48 overflow-y-auto">
                {filteredModels.slice(0, 20).map((model, index) => (
                  <li
                    key={index}
                    onClick={() => handleModelChange(model)} // Apply model change on click
                    className="px-3 py-2 cursor-pointer hover:bg-[#2563EB] hover:text-white"
                  >
                    {model}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Buttons */}
      <div className="px-4 space-y-4">
        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#4F46E5] px-4 py-2 rounded-lg">
          <IoSettingsSharp />
          <span>{selectedModel || "Select Model"}</span>
        </button>

        <button
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#E63946] to-[#F87171] px-4 py-2 rounded-lg"
          onClick={handelClearConversation}
        >
          <GiConversation />
          <span>Clear Conversation</span>
        </button>
      </div>

      {/* Sidebar Footer */}
      <div className="absolute bottom-0 left-0 w-full rgb(23, 23, 23) border-t border-gray-700 p-4">
        <Link
          to="/upgrade"
          className="flex flex-col items-center justify-center bg-gradient-to-r from-[#9B4DCA] to-[#6D28D9] px-4 py-3 rounded-lg text-white"
        >
          <span className="text-lg font-semibold">Upgrade Plan</span>
          <div className="w-full border-t border-gray-500 my-2"></div>
          <span className="text-sm text-gray-200">Unlock Premium Models</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
