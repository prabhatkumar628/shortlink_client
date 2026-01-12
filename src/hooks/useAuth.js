import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api.js";

export const loginApi = async (data) => {
  const response = await api.post("/auth/user/login", data);
  return response.data;
};
export const signupApi = async (data) => {
  const response = await api.post("/auth/user/signup", data);
  return response.data;
};

export const logoutApi = async () => {
  const response = await api.post("/auth/user/logout");
  return response.data;
};
export const meApi = async () => {
  const response = await api.get("/auth/user/me");
  return response.data;
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: meApi,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      // queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries(["me"], res.data.data);
    },
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signupApi,
    onSuccess: (res) => {
      queryClient.invalidateQueries(["me"], res.data.data);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.setQueryData(["me"], null);
      queryClient.clear();
      window.location.href = "/";
    },
  });
};
