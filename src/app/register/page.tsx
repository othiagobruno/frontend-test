"use client";
import styles from "../page.module.css";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ICreateUserDto, useRegister } from "@/hooks/useRegister";

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup
    .string()
    .email("Email inválido, por favor digite um email válido")
    .required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

export default function RegisterPage() {
  const { register, loading, error } = useRegister();
  const formMethods = useForm<ICreateUserDto>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const errorEmail = formMethods.formState.errors.email?.message;
  const errorPassword = formMethods.formState.errors.password?.message;
  const errorName = formMethods.formState.errors.name?.message;

  return (
    <main className={styles.main}>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(register)}>
          <div className={styles.div_login}>
            <h1 className={styles.title_login}>Criar conta</h1>
            <input
              placeholder="Nome"
              className={styles.input}
              {...formMethods.register("name")}
            />
            {errorName && <p className={styles.error_input}>{errorName}</p>}

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
                <p>Ocorreu um erro ao criar uma conta</p>
              </div>
            )}

            <a className={styles.link} href="/">
              Já tem uma conta? Faça login
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
