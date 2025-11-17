// src/config/appConfig.ts
export const APP_CONFIG = {
  BASE_URL: "http://YOUR_BACKEND_IP:3000/api" // <<-- set to your backend URL (use machine IP)
};
export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000';
