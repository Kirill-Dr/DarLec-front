"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import Logo from "@/app/_images/logo.svg";
import Link from "next/link";
import gsap from "gsap";
import BurgerButton from "@/app/_components/BurgerButton/BurgerButton";

export const HeaderComponent: React.FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  const toggleOpened = () => {
    setIsOpened(!isOpened);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth >= 1030) {
      setIsOpened(false);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (isOpened) {
      gsap.to(`.${styles.header__nav_mobile}`, {
        display: "block",
        opacity: 1,
        duration: 1,
        ease: "bounce.out",
        y: -100,
      });
    } else {
      gsap.to(`.${styles.header__nav_mobile}`, {
        display: "none",
        opacity: 0,
        duration: 0.7,
        y: 0,
      });
    }
  }, [isOpened]);

  return (
    <>
      <header className={styles.header}>
        <div>
          <Link href="/">
            <Image src={Logo} height={30} alt="Logo" priority={true} />
          </Link>
        </div>
        <nav className={styles.header__nav_container}>
          <ul className={styles.header__nav}>
            <li className={styles.nav__item}>
              <Link href="/">Лекции</Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="/schedule">Расписание</Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="/homework">Домашняя работа</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.burger__container} onClick={toggleOpened}>
          <BurgerButton isOpened={isOpened} />
        </div>
      </header>
      <nav className={styles.header__nav_mobile}>
        <ul className={styles.nav__mobile}>
          <Link href="/" onClick={() => setIsOpened(false)}>
            <li>Лекции</li>
          </Link>
          <Link href="/schedule" onClick={() => setIsOpened(false)}>
            <li>Расписание</li>
          </Link>
          <Link href="/homework" onClick={() => setIsOpened(false)}>
            <li>Домашняя работа</li>
          </Link>
        </ul>
      </nav>
    </>
  );
};
