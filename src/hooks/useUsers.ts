import { api } from "@/services/api";
import { useState } from "react";

export const useUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get<IUser[]>("/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { getUsers, loading, users };
};

export interface IUser {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
