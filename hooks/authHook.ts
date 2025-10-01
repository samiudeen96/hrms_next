import { loginFn, profileFn } from "@/app/api/services/userService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  //mutation is used for Function (Add, Delete and Edit)
  return useMutation({
    mutationFn: loginFn,
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: profileFn,
    staleTime: Infinity, // optional: cache user indefinitely
    retry: false, // optional: don't retry on auth errors
  });
};
