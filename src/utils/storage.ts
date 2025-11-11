// src/utils/storage.ts
import { Platform } from "react-native";

const TOKEN_KEY = "kc_tokens";

/**
 * Hybrid storage: on web use localStorage, on native use expo-secure-store.
 * We require expo-secure-store at runtime only on native to avoid web errors.
 */

export async function saveTokenStorage(value: any) {
  if (Platform.OS === "web") {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(value));
  } else {
    const SecureStore = require("expo-secure-store");
    await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(value));
  }
}

export async function getTokenStorage() {
  if (Platform.OS === "web") {
    const raw = localStorage.getItem(TOKEN_KEY);
    return raw ? JSON.parse(raw) : null;
  } else {
    const SecureStore = require("expo-secure-store");
    const raw = await SecureStore.getItemAsync(TOKEN_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}

export async function removeTokenStorage() {
  if (Platform.OS === "web") {
    localStorage.removeItem(TOKEN_KEY);
  } else {
    const SecureStore = require("expo-secure-store");
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }
}
