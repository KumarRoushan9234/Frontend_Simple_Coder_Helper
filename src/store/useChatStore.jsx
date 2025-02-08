import { create } from "zustand";
import api from "../util/api";

export const useChatStore = create((set, get) => ({
  isSidebarOpen: false,
  selectedModel: null,

  setSidebarOpen: () => {
    set({ isSidebarOpen: !get().isSidebarOpen });
  },
  setModel: (model) => {
    set({ selectedModel: model });
  },
}));

// signup: async (name, username, email, password) => {
//   try {
//     const res = await api.post("/auth/signup", {
//       name,
//       username,
//       email,
//       password,
//     });

//     if (res.data.success) {
//       const user = res.data.data;
//       set({ authUser: user, isCheckingAuth: false });
//       sessionStorage.setItem("authUser", JSON.stringify(user));
//     }

//     return { success: true };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.response?.data?.message || "Signup failed",
//     };
//   }
// },

// login: async (email, password) => {
//   try {
//     const res = await api.post("/auth/login", { email, password });

//     const user = res.data.data;
//     set({ authUser: user, isCheckingAuth: false });

//     // Save user info in sessionStorage (not the token, just user details)
//     sessionStorage.setItem("authUser", JSON.stringify(user));

//     return { success: true };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.response?.data?.message || "Login failed",
//     };
//   }
// },

// logout: async () => {
//   try {
//     await api.post("/auth/logout");
//     set({ authUser: null, isCheckingAuth: false });
//     sessionStorage.removeItem("authUser");
//   } catch (error) {
//     console.error("Logout failed:", error);
//   }
// },

// checkAuthStatus: async () => {
//   set({ isCheckingAuth: true });

//   try {
//     const res = await api.get("/auth/me");

//     if (res.data.success && res.data.data) {
//       const user = res.data.data;
//       sessionStorage.setItem("authUser", JSON.stringify(user));
//       set({ authUser: user, isCheckingAuth: false });
//     } else {
//       set({ authUser: null, isCheckingAuth: false });
//       sessionStorage.removeItem("authUser");
//     }
//   } catch (error) {
//     console.log("Auth check failed:", error);
//     set({ authUser: null, isCheckingAuth: false });
//     sessionStorage.removeItem("authUser");
//   }
// },
