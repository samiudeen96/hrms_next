"use client";

import FormField from "@/components/FormFields";
import Spinner from "@/components/Spinner";
import { useLogin } from "@/hooks/authHook";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isRemember: false,
  });

  const router = useRouter();
  const login = useLogin();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(formData);

    // login.mutate(formData, {
    //   onSuccess: (data) => {
    //     // console.log(data);

    //     if (data.success) {
    //       router.push("/dashboard");
    //     }
    //   },

    //   onError: (error) => {
    //     const message = error?.message || "Something went wrong";
    //     toast.error(message);
    //   },
    // });

    login.mutate(formData, {
      onSuccess: (data) => {
        if (data.success) {
          router.push("/dashboard");
        }
      },
      onError: (error: any) => {
        toast.error(error.message); // ✅ will now show toast
      },
    });
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-slate-200">
      <div className="w-full max-w-md sm:p-10 p-6 m-4 rounded-lg bg-white">
        <h2 className="text-center font-semibold mb-8 text-lg">Company Name</h2>
        {/* <h1 className="text-2xl font-bold text-center mt-4 mb-6">Login</h1> */}
        <form onSubmit={handlerSubmit} className="flex flex-col space-y-5">
          <FormField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="johnDoe@example.com"
            type="email"
            required
          />

          <FormField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="*********"
            type="password"
            required
          />

          <div className="flex justify-between items-center text-xs">
            <FormField
              label="Remember me"
              name="isRemember"
              type="checkbox"
              value={formData.isRemember}
              onChange={handleChange}
            />

            <p>Forget Password?</p>
          </div>

          <button
            disabled={login.isPending}
            type="submit"
            className="bg-blue-600 text-white p-2 rounded"
          >
            {login.isPending ? (
              <>
                <Spinner />
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
