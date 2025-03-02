// src/utils/api.js
import axios from "axios";

// Base API instance
const API = axios.create({
  baseURL: "http://localhost:5000", // Update with your backend URL
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (credentials) => API.post("/auth/login", credentials);
export const googleLogin = () => API.get("/auth/google"); // Google OAuth endpoint
