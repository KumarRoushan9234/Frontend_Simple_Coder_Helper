import { create } from "zustand";
import api from "../util/api";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,

  signup: async (name, username, email, password) => {
    try {
      const res = await api.post("/auth/signup", {
        name,
        username,
        email,
        password,
      });

      if (res.data.success) {
        const user = res.data.data;
        set({ authUser: user, isCheckingAuth: false });
        sessionStorage.setItem("authUser", JSON.stringify(user));
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Signup failed",
      };
    }
  },

  login: async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });

      const user = res.data.data;
      set({ authUser: user, isCheckingAuth: false });

      // Save user info in sessionStorage (not the token, just user details)
      sessionStorage.setItem("authUser", JSON.stringify(user));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ authUser: null, isCheckingAuth: false });
      sessionStorage.removeItem("authUser");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },

  checkAuthStatus: async () => {
    set({ isCheckingAuth: true });

    try {
      const res = await api.get("/auth/me");

      if (res.data.success && res.data.data) {
        const user = res.data.data;
        sessionStorage.setItem("authUser", JSON.stringify(user));
        set({ authUser: user, isCheckingAuth: false });
      } else {
        set({ authUser: null, isCheckingAuth: false });
        sessionStorage.removeItem("authUser");
      }
    } catch (error) {
      console.log("Auth check failed:", error);
      set({ authUser: null, isCheckingAuth: false });
      sessionStorage.removeItem("authUser");
    }
  },
  updateUser: async (name, username) => {
    try {
      const res = await api.put("/auth/update-user", { name, username });

      if (res.data.success) {
        const updatedUser = { ...get().authUser, name, username };
        set({ authUser: updatedUser });

        // Update sessionStorage
        sessionStorage.setItem("authUser", JSON.stringify(updatedUser));

        return { success: true, message: "User updated successfully" };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Update failed",
      };
    }
  },
}));

useAuthStore.getState().checkAuthStatus();
