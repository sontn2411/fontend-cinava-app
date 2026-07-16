import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Handle unauthorized
      }

      if (status === 500) {
        console.error("[API] Server error:", error.response.data);
      }
    } else if (error.request) {
      console.error("[API] Network error — no response received");
    }

    return Promise.reject(error);
  },
);
