import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL
  ? `${import.meta.env.VITE_BACKEND_URL}/api/v1`
  : "/api/v1";

export const api = axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
