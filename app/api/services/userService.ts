import API from "./axios";
import { AxiosError } from "axios";

export type FormData = {
  email: string;
  password: string;
};

// 👇 Define your backend error shape (adjust if needed)
export interface ApiError {
  message: string;
}

export const loginFn = async (formData: FormData) => {
  try {
    const res = await API.post("/api/auth/login", formData);
    return res.data;
  } catch (error: any) {
    // Extract message from API error
    const message = error.response?.data?.error || "Something went wrong";
    throw new Error(message);   // ✅ throw instead of return
  }
};


export const profileFn = async () => {
  try {
    const res = await API.get("/api/auth/me");
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    throw axiosError.response?.data || { message: "Something went wrong" };
  }
};

export const logoutFn = async () => {
  await API.post("/api/auth/logout");
};
