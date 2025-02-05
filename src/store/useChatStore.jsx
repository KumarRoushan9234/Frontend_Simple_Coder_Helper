import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isMessagesSending: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await api.get("/message/users");
      toast.success(`${res.data.message}`);
      console.log(res.data.data);
      set({ users: res.data.data ?? [] });
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    if (!userId) {
      toast.error("No user selected");
      return;
    }
    try {
      const res = await api.get(`/message/${userId}`);
      console.log(res.data.data);
      set({ messages: res.data.data });
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    set({ isMessagesSending: true });
    const { selectedUser, messages } = get();
    try {
      console.log("Sending message to:", selectedUser._id);
      console.log("Message data:", messageData);
      const res = await api.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );

      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesSending: false });
    }
  },
  setSelectedUser: (user) => set({ selectedUser: user }), //Update selected user
}));
