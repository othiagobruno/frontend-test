"use client";

import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLogin = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const login = async (data: ILoginDto) => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.post<IAuth>("/auth", data);
      localStorage.setItem("userAndToken", JSON.stringify(res.data));
      api.defaults.headers["Authorization"] = `Bearer ${res.data.token}`;
      setError(false);
      push("/home");
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
};

export interface ILoginDto {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAuth {
  user: User;
  token: string;
  refresh_token: string;
}
