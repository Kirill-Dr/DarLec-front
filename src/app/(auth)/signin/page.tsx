"use client";
import { signin } from "@/app/(auth)/_actions/actions";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { HeaderComponent } from "@/app/_components/Header/Header";
import Link from "next/link";
import ScrollToTop from "@/app/_components/ScrollToTop/ScrollToTop";

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
      console.log(result?.data);
      console.log("Пользователь успешно авторизирован!");
    }
  };

  return (
    <>
      <HeaderComponent />
      <div>
        <ScrollToTop />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Почта</label>
            <input name="email" placeholder="Почта" />
          </div>
          <div>
            <label htmlFor="password">Пароль</label>
            <input name="password" type="password" placeholder="Пароль" />
          </div>
          <button type="submit">Вход</button>
          {errorValidation && <p style={{ color: "red" }}>{errorValidation}</p>}
        </form>
        <div>
          Нет Аккаунта?{" "}
          <Link href="/signup" scroll={false}>
            Зарегестрироваться
          </Link>
        </div>
      </div>
    </>
  );
}
