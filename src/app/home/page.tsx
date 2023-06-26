"use client";

import React, { useEffect } from "react";
import styles from "./home.module.css";
import { useUsers } from "@/hooks/useUsers";

const HomePage: React.FC = () => {
  const { getUsers, users } = useUsers();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.home}>
        <h1 className={styles.title}>Bem vindo ao sistema</h1>
        <h1 className={styles.title}>Lista de usuarios</h1>

        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
