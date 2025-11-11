// src/api/themeApi.ts
import api from "./axiosConfig";

export const themeApi = {
  getTheme: () => api.get("/theme"),
  updateTheme: (payload: any) => api.put("/theme", payload)
};
