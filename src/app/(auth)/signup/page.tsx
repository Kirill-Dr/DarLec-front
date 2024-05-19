"use client";
import { signup } from "@/app/(auth)/_actions/actions";
import styles from "../forms.module.css";
import React, { useState } from "react";
import Link from "next/link";
import { HeaderComponent } from "@/app/_components/Header/Header";
import ScrollToTop from "@/app/_components/ScrollToTop/ScrollToTop";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [errorValidation, setErrorValidation] = useState<string>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await signup(formData);

    if (result?.errors) {
      const validationErrors = Object.values(result.errors).flat();
      setErrorValidation(validationErrors[0]);
    } else {
      router.push("/signin");
    }
  };

  return (
    <>
      <HeaderComponent />
      <div className={styles.form__mainContainer}>
        <ScrollToTop />
        <form onSubmit={handleSubmit} className={styles.form__container}>
          <div className={styles.input__container}>
            <label htmlFor="username">Имя пользователя:</label>
            <input
              name="username"
              placeholder="Имя пользователя"
              className={styles.input__block}
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor="email">Почта:</label>
            <input
              name="email"
              placeholder="Почта"
              className={styles.input__block}
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor="password">Пароль:</label>
            <input
              name="password"
              type="password"
              placeholder="Пароль"
              className={styles.input__block}
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor="confirmPassword">Подтверждение пароля:</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Подтверждение пароля"
              className={styles.input__block}
            />
          </div>
          <button type="submit" className={styles.action__button}>
            Регистрация
          </button>
          {errorValidation && (
            <p className={styles.error__text}>{errorValidation}</p>
          )}
        </form>
        <div className={styles.account__container}>
          Есть аккаунт?{" "}
          <Link href="/signin" scroll={false}>
            Войти
          </Link>
        </div>
      </div>
    </>
  );
}
