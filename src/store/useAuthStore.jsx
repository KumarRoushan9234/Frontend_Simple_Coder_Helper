import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isSigningOut: false,
  isCheckingAuth: true,

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await api.post("/auth/signup", data);
      toast.success("Account Created Successfully!");
      set({ authUser: res.data.user });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // Direct login and store user data
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const res = await api.post("/auth/login", credentials);
      toast.success("User Logged In Successfully!");
      set({ authUser: res.data.data });

      localStorage.setItem("authToken", res.data.token); // Save token

      return res.data; // Return user data after successful login
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      throw new Error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    set({ isSigningOut: true });
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("authToken"); // Remove token on logout
      set({ authUser: null });
      toast.success("User Logged out!");
    } catch (error) {
      console.error("Error during Logout:", error.response?.data?.message);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      set({ isSigningOut: false });
    }
  },
}));
