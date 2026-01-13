import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api.js";

const createUrl = async (payload) => {
  const response = await api.post("/urls/create", payload);
  return response.data.data;
};

const getUrls = async () => {
  const response = await api.get("/urls");
  return response.data;
};

const deleteById = async (id) => {
  const response = await api.delete(`/urls/${id}`);
  return response.data;
};

export const useCreateUrl = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUrl,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
    },
  });
};

export const useGetUrls = () => {
  return useQuery({
    queryKey: ["urls"],
    queryFn: getUrls,
  });
};

export const useDeleteUrls = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
    },
  });
};
