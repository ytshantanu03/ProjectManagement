import axios from "axios";

const API_BASE_URL = "http://localhost:5000/auth"; // Adjust the base URL as per your backend

// Register user
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login user
export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Google OAuth login
export const googleLogin = async (tokenId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/google`, { tokenId });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
