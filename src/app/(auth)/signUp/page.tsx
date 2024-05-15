"use client";
import { signup } from "@/app/(auth)/_actions/auth";
import { FormEvent, useState } from "react";
import { AxiosError } from "axios";

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    try {
      await signup(formData);
    } catch (error) {
      if (error instanceof AxiosError) setError(error.response?.data?.message);
    }
  };

  return (
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
        <input name="password" type="password" placeholder="Пароль" />
      </div>
      <div>
        <label htmlFor="confirmPassword">Подтверждение пароля</label>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Подтверждение пароля"
        />
      </div>
      {error && <div>{error}</div>}
      <button type="submit">Регистрация</button>
    </form>
  );
}
