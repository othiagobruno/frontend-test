"use client";
import { ILoginDto, useLogin } from "@/hooks/useLogin";
import styles from "./page.module.css";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido, por favor digite um email válido")
    .required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

export default function AuthPage() {
  const { login, loading, error } = useLogin();
  const formMethods = useForm<ILoginDto>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const errorEmail = formMethods.formState.errors.email?.message;
  const errorPassword = formMethods.formState.errors.password?.message;

  return (
    <main className={styles.main}>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(login)}>
          <div className={styles.div_login}>
            <h1 className={styles.title_login}>Login</h1>
            <input
              placeholder="Email"
              className={styles.input}
              {...formMethods.register("email")}
            />
            {errorEmail && <p className={styles.error_input}>{errorEmail}</p>}

            <input
              type="password"
              placeholder="Senha"
              className={styles.input}
              {...formMethods.register("password")}
            />
            {errorPassword && (
              <p className={styles.error_input}>{errorPassword}</p>
            )}

            {error && (
              <div className={styles.error_container}>
                <p>Ocorreu um erro ao fazer login, tente novamente</p>
              </div>
            )}

            <a href="/register" className={styles.link}>
              Não tem uma conta? Cadastre-se
            </a>

            <button type="submit" className={styles.button}>
              {loading ? "Carregando..." : "Entrar"}
            </button>
          </div>
        </form>
      </FormProvider>
    </main>
  );
}
