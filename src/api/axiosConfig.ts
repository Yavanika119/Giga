// src/api/axiosConfig.ts
import axios from "axios";
import { APP_CONFIG } from "../config/appConfig";
import { getAccessToken } from "../auth/tokenService";
import { refreshAccessToken } from "../auth/refreshToken";

const api = axios.create({
  baseURL: APP_CONFIG.BASE_URL,
  timeout: 15000
});

api.interceptors.request.use(async (config: any) => {
  try {
    const token = await getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (e) {
    // ignore
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original?._retry) {
      original._retry = true;
      const newToken = await refreshAccessToken();
      if (newToken) {
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
