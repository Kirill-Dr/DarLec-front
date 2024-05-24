"use client";
import { signin } from "@/app/(auth)/_actions/actions";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { HeaderComponent } from "@/app/_components/Header/Header";
import Link from "next/link";
import ScrollToTop from "@/app/_components/ScrollToTop/ScrollToTop";
import styles from "../forms.module.css";

export default function SigninPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [errorValidation, setErrorValidation] = useState<string>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await signin(formData);

    if (result?.errors) {
      const validationErrors = Object.values(result.errors).flat();
      setErrorValidation(validationErrors[0]);
    } else {
      router.push("/", { scroll: false });
    }
  };

  return (
    <>
      <HeaderComponent />
      <div className={styles.form__mainContainer}>
        <ScrollToTop />
        <form onSubmit={handleSubmit} className={styles.form__container}>
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
          <button type="submit" className={styles.action__button}>
            Вход
          </button>
          {errorValidation && (
            <p className={styles.error__text}>{errorValidation}</p>
          )}
        </form>
        <div className={styles.account__container}>
          Нет Аккаунта?{" "}
          <Link href="/signup" scroll={false}>
            Зарегестрироваться
          </Link>
        </div>
      </div>
    </>
  );
}
