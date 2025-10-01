import axios, { AxiosError } from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true, // send cookies automatically
});

// Interceptor to handle access token expiration
API.interceptors.response.use(
  (response) => response, // just return successful responses
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // ✅ Skip refresh for login or refresh endpoints
    const skipRefresh = originalRequest.url?.includes("/api/auth/login") ||
                        originalRequest.url?.includes("/api/auth/refresh");

    // Retry logic for 401 responses
    if (!skipRefresh && error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("[Axios] Access token expired, calling refresh...");
        const res = await API.post("/api/auth/refresh"); // use same instance
        console.log("[Axios] Refresh response:", res.data);

        // Retry original request after successful refresh
        return API(originalRequest);
      } catch (err) {
        console.error("[Axios] Refresh failed, redirecting to login...", err);
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(err);
      }
    }

    return Promise.reject(error); // propagate other errors
  }
);

export default API;
