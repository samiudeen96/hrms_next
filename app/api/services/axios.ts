import axios, { AxiosError, AxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    const skipRefresh =
      originalRequest.url?.includes("/api/auth/login") ||
      originalRequest.url?.includes("/api/auth/refresh");

    if (!skipRefresh && error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("[Axios] Access token expired, calling refresh...");
        const res = await API.post("/api/auth/refresh");
        console.log("[Axios] Refresh response:", res.data);

        return API(originalRequest); // retry
      } catch (err) {
        console.error("[Axios] Refresh failed, redirecting to login...", err);
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
