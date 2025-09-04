import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: false, // IMPORTANT: matches CORS supports_credentials=false
});

export default api;
