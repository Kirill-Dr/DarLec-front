"use client";
import { signin } from "@/app/(auth)/_actions/actions";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { resetLessons } from "@/app/_redux/features/scheduleSlice";

export default function SigninPage() {
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
      console.log(result?.data);
      console.log("Пользователь успешно авторизирован!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Почта</label>
          <input name="email" placeholder="Почта" />
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <input name="password" type="text" placeholder="Пароль" />
        </div>
        <button type="submit">Регистрация</button>
        {errorValidation && <p style={{ color: "red" }}>{errorValidation}</p>}
      </form>
      <button
        onClick={() => {
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          dispatch(resetLessons());
          console.log("Вышел");
        }}
      >
        Выйти
      </button>
    </div>
  );
}
