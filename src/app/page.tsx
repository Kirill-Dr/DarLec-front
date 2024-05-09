import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import PlatformImage from "./_images/platform.svg";
import LecturesImage from "./_images/lectures.svg";
import HomeworkImage from "./_images/homework.svg";
import ScheduleImage from "./_images/schedule.svg";
import Link from "next/link";

export default function Home() {
  return (
    <section className={styles.home__container}>
      <h1 className={styles.container__title}>
        Ваше образовательное путешествие начинается с DarLec!
      </h1>
      <div className={styles.container__info}>
        <p>
          DarLec - это платформа для студентов, где лекции, домашние задания и
          расписание собраны в одном месте. Мы стремимся сделать обучение
          доступным и удобным для каждого.
        </p>
        <Image
          src={PlatformImage}
          alt="Books"
          className={styles.container__image}
        />
      </div>
      <h2 className={styles.container__title}>Лекции</h2>
      <div className={styles.container__info}>
        <Image
          src={LecturesImage}
          alt="Lectures"
          className={styles.container__image}
        />
        <p>
          Наши авторизованные пользователи делятся своими лекциями, загружая их
          на нашу платформу. Учитесь в своем темпе, когда и где вам удобно.
        </p>
      </div>
      <h2 className={styles.container__title}>Домашние задания</h2>
      <div className={styles.container__info}>
        <p>
          Мы предоставляем актуальные домашние задания, чтобы помочь вам сдавать
          всё в нужные сроки. Это ваш личный дневник обучения, наполненный
          заданиями от преподавателей.
        </p>
        <Image
          src={HomeworkImage}
          alt="Homework"
          className={styles.container__image}
        />
      </div>
      <h2 className={styles.container__title}>Расписание</h2>
      <div className={styles.container__info}>
        <Image
          src={ScheduleImage}
          alt="Schedule"
          className={styles.container__image}
        />
        <p>
          В нашем расписании указаны предметы. Мы стремимся сделать ваше
          обучение максимально удобным, предоставляя вам удобный интерфейс для
          просмотра расписания.
        </p>
      </div>
      <Link href="/schedule" className={styles.join__button}>
        Начните свое образовательное путешествие сегодня!
      </Link>
    </section>
  );
}
