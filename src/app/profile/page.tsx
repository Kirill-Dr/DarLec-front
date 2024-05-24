"use client";
import styles from "./page.module.css";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { HeaderComponent } from "@/app/_components/Header/Header";

interface User {
  userEmail: string;
  username: string;
  role: string;
}

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      const decoded: User = jwtDecode(token);
      setUserInfo(decoded);
    }
  }, []);

  return (
    <>
      <HeaderComponent />
      <div className={styles.user__container}>
        <h1 className={styles.user__title}>Информация о пользователе</h1>
        <div>
          {userInfo?.userEmail}
          <br />
          {userInfo?.username}
          <br />
          {userInfo?.role}
        </div>
      </div>
    </>
  );
}
