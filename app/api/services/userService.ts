import API from "./axios";

export type FormData = {
  email: string;
  password: string;
};

export const loginFn = async (formData: FormData) => {
  try {
    const res = await API.post("/api/auth/login", formData);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

export const profileFn = async () => {
  try {
    const res = await API.get("/api/auth/me");
    return res.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

export const logoutFn = async () => {
  await API.post("/api/auth/logout");
};
