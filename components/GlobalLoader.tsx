"use client"

// import { useMe } from "@/hooks/authHook";
import React from "react";

const GlobalLoader = () => {
  // const { data, isLoading } = useMe();

  return (
    // isLoading && (
      <div className="w-screen h-screen absolute top-0 left-0 bg-white flex justify-center items-center">
        <div className="spinner"></div>

      </div>
    )
  // );
};

export default GlobalLoader;
