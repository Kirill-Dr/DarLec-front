"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import Logo from "@/app/_images/logo.svg";
import Link from "next/link";
import gsap from "gsap";
import BurgerButton from "@/app/_components/BurgerButton/BurgerButton";
import Cookies from "js-cookie";
import { resetLessons } from "@/app/_redux/features/scheduleSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/app/(auth)/_actions/actions";
import { resetHomework } from "@/app/_redux/features/homeworkSlice";

export const HeaderComponent: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const toggleOpened = () => {
    setIsOpened(!isOpened);
  };

  const handleLogout = async () => {
    await logout();
    dispatch(resetLessons());
    dispatch(resetHomework());
    router.push("/");
    window.location.reload();
  };

  useEffect(() => {
    if (isOpened) {
      gsap.to(`.${styles.header__nav}`, {
        display: "block",
        opacity: 1,
        duration: 1,
        ease: "bounce.out",
        y: -100,
      });
    } else {
      gsap.to(`.${styles.header__nav}`, {
        display: "none",
        opacity: 0,
        duration: 0.7,
        y: 0,
      });
    }
  }, [isOpened]);

  useEffect(() => {
    setIsAuthenticated(!!Cookies.get("access_token"));
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div>
          <Link href="/" scroll={false}>
            <Image src={Logo} height={30} alt="Logo" priority={true} />
          </Link>
        </div>
        <div className={styles.burger__container} onClick={toggleOpened}>
          <BurgerButton isOpened={isOpened} />
        </div>
      </header>
      <nav className={styles.header__nav}>
        <ul className={styles.nav__container}>
          <Link href="/" scroll={false} onClick={() => setIsOpened(false)}>
            <li>Лекции</li>
          </Link>
          <Link
            href="/schedule"
            scroll={false}
            onClick={() => setIsOpened(false)}
          >
            <li>Расписание</li>
          </Link>
          <Link
            href="/homework"
            scroll={false}
            onClick={() => setIsOpened(false)}
          >
            <li>Домашняя работа</li>
          </Link>
          {isAuthenticated === null ? null : isAuthenticated ? (
            <Link href="/" scroll={false} onClick={handleLogout}>
              <li>Выйти</li>
            </Link>
          ) : (
            <>
              <Link
                href="/signin"
                scroll={false}
                onClick={() => setIsOpened(false)}
              >
                <li>Войти</li>
              </Link>
              <Link
                href="/signup"
                scroll={false}
                onClick={() => setIsOpened(false)}
              >
                <li>Зарегистрироваться</li>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};
