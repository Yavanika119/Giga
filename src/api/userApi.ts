// src/api/userApi.ts
import api from "./axiosConfig";

export const userApi = {
  list: () => api.get("/users"),
  get: (id: string) => api.get(`/users/${id}`)
};
