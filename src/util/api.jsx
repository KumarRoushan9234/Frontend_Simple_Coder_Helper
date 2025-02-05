import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // Update with your backend URL
  withCredentials: true, // Ensure cookies are sent
});

export default api;
