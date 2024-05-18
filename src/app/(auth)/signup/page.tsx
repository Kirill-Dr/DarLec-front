"use client";
import { signup } from "@/app/(auth)/_actions/actions";
import React, { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [errorValidation, setErrorValidation] = useState<string>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await signup(formData);

    if (result?.errors) {
      const validationErrors = Object.values(result.errors).flat();
      setErrorValidation(validationErrors[0]);
    } else {
      console.log("Пользователь успешно зарегистрирован!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Имя пользователя</label>
          <input name="username" placeholder="Имя пользователя" />
        </div>
        <div>
          <label htmlFor="email">Почта</label>
          <input name="email" placeholder="Почта" />
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <input name="password" type="text" placeholder="Пароль" />
        </div>
        <div>
          <label htmlFor="confirmPassword">Подтверждение пароля</label>
          <input
            name="confirmPassword"
            type="text"
            placeholder="Подтверждение пароля"
          />
        </div>
        <button type="submit">Регистрация</button>
        {errorValidation && <p style={{ color: "red" }}>{errorValidation}</p>}
      </form>
      <Link href="/signin">Войти</Link>
    </div>
  );
}
