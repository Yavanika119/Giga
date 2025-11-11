// src/auth/refreshToken.ts
import { getRefreshToken, saveTokens } from "./tokenService";
import { authApi } from "../api/authApi";

export async function refreshAccessToken() {
  try {
    const refresh = await getRefreshToken();
    if (!refresh) return null;
    const res = await authApi.refresh({ refreshToken: refresh });
    if (res?.data?.access_token) {
      await saveTokens(res.data);
      return res.data.access_token;
    }
    return null;
  } catch (err) {
    console.log("refreshAccessToken failed", err);
    return null;
  }
}
