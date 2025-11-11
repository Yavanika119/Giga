// src/auth/keycloak.ts
import { authApi } from "../api/authApi";
import { saveTokens, clearStoredTokens } from "./tokenService";

/**
 * Frontend speaks to backend:
 *  - POST /auth/login { username, password } -> backend handles Keycloak and returns tokens
 *  - POST /auth/logout -> backend revokes
 */

export async function loginWithBackend(username: string, password: string) {
  try {
    const res = await authApi.login({ username, password });
    if (res?.data?.access_token) {
      await saveTokens(res.data);
      return { success: true };
    }
    return { success: false, message: "Invalid response from backend" };
  } catch (err: any) {
    return { success: false, message: err?.response?.data?.message || err.message || "Login failed" };
  }
}

export async function logoutFromBackend() {
  try {
    await authApi.logout();
  } catch (err) {
    // ignore backend error
  } finally {
    await clearStoredTokens();
  }
}
