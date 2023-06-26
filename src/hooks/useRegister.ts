"use client";

import { api } from "@/services/api";
import { useState } from "react";
import { useLogin } from "./useLogin";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { login } = useLogin();

  const register = async (data: ICreateUserDto) => {
    setLoading(true);
    setError(false);
    try {
      await api.post("/users", data);
      setLoading(false);
      setError(false);
      await login({ email: data.email, password: data.password });
      return false;
    } catch (err) {
      setLoading(false);
      setError(true);
      return false;
    }
  };

  return { register, loading, error };
};

export interface ICreateUserDto {
  email: string;
  password: string;
  name: string;
}
