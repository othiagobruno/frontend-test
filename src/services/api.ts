"use client";

import { IAuth } from "@/hooks/useLogin";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3400",
});

api.interceptors.request.use(async (config) => {
  const userAndToken = JSON.parse(
    localStorage.getItem("userAndToken") || "{}"
  ) as IAuth;

  if (userAndToken && userAndToken.token) {
    config.headers.Authorization = `Bearer ${userAndToken.token}`;
  }

  return config;
});

api.interceptors.response.use(
  async (config) => {
    const userAndToken = JSON.parse(
      localStorage.getItem("userAndToken") || "{}"
    ) as IAuth;

    if (config.status === 401 && userAndToken && userAndToken.refresh_token) {
      await refreshToken(userAndToken.refresh_token);
      return api.request(config);
    }
    return config;
  },
  async (error) => {
    const res = error.response;

    const userAndToken = JSON.parse(
      localStorage.getItem("userAndToken") || "{}"
    ) as IAuth;

    if (res.status === 401 && userAndToken && userAndToken.refresh_token) {
      await refreshToken(userAndToken.refresh_token);
      return api.request(error.config);
    }
    return Promise.reject(error);
  }
);

const refreshToken = async (refreshToken: string) => {
  const res = await api.post<IAuth>("/auth/refresh", {
    refresh_token: refreshToken,
  });

  localStorage.setItem("userAndToken", JSON.stringify(res.data));
};
