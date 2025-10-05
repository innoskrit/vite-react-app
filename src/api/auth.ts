import type { SignInRequest } from "@/types/auth";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  if (config.url?.startsWith("/api/v1/auth/")) {
    return config;
  }

  const userSession = localStorage.getItem("userSession");
  if (userSession) {
    const { token } = JSON.parse(userSession);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const signInByGoogle = (code: string) =>
  api.get(`/api/v1/auth/google-auth?code=${code}`);

export const signIn = (signInRequest: SignInRequest) =>
  api.post("/api/v1/auth/signin", signInRequest);
