import { create } from "zustand";
import api from "../util/api";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  isSidebarOpen: false,
  selectedModel: null,
  chatHistory: [],
  messages: [],
  userInput: "",
  response: "",
  isLoading: false,
  error: null,

  setSidebarOpen: () => {
    set({ isSidebarOpen: !get().isSidebarOpen });
  },

  setModel: (model) => {
    set({ selectedModel: model });
  },

  setUserInput: (input) => {
    set({ userInput: input });
  },

  setMessages: (newMessages) => {
    set({ messages: newMessages });
  },

  fetchConversation: async () => {
    try {
      set({ isLoading: true });
      const { data } = await api.get("/chat/get_conversation");
      console.log("from api=> \n", data);
      if (data.success) {
        set({ chatHistory: data.data, messages: data.data, isLoading: false });
        console.log("chat history \n", data.data);
        toast.success("Conversation history loaded!");
      } else {
        console.log("Failed to fetch conversation ||", data.message);
        throw new Error(data.message || "Failed to fetch conversation");
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error("Failed to load conversation history! || ", error);
    }
  },

  askQuestion: async (question) => {
    try {
      set({ isLoading: true });
      const response = await api.post("/chat/ask", { user_input: question });
      const { data } = response;
      if (data.success) {
        return data.data.response;
      } else {
        throw new Error(data.message || "Failed to get response");
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error("Failed to get response!");
      return null;
    }
  },

  clearConversation: async () => {
    try {
      set({ isLoading: true });
      const response = await api.post("/chat/clear_conversation");
      if (response.data.success) {
        set({ chatHistory: [], messages: [], isLoading: false });
        toast.success("Conversation history cleared!");
      } else {
        throw new Error(
          response.data.message || "Failed to clear conversation"
        );
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error("Failed to clear conversation history!");
    }
  },

  selectModel: async (model) => {
    try {
      set({ isLoading: true });
      const response = await api.post("/chat/select_model", { model });
      console.log(response);
      if (response.data.success) {
        set({ selectedModel: model, isLoading: false });
        toast.success(`Model '${model}' selected successfully!`);
      } else {
        throw new Error(response.data.message || "Failed to select model");
      }
    } catch (error) {
      console.error("Error selecting model:", error);
      set({ error: error.message, isLoading: false });
      toast.error("Failed to select model!");
    }
  },
}));
