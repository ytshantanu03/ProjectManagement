import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com",
});

export const fetchData = async (endpoint) => {
  const response = await api.get(endpoint);
  return response.data;
};

export default api;
