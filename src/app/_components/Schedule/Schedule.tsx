import React from "react";
import styles from "./Schedule.module.css";
import { Lesson, ScheduleProps } from "@/app/_interfaces/Schedule";

export const Schedule: React.FC<ScheduleProps> = ({ lessons }) => {
  const lessonsByDay = lessons.reduce<Record<string, Lesson[]>>(
    (acc, lesson) => {
      (acc[lesson.day] = acc[lesson.day] || []).push(lesson);
      return acc;
    },
    {},
  );

  for (let day in lessonsByDay) {
    lessonsByDay[day].sort((a, b) => {
      const [aHours, aMinutes] = a.timeStart.split(":").map(Number);
      const [bHours, bMinutes] = b.timeStart.split(":").map(Number);
      return aHours * 60 + aMinutes - (bHours * 60 + bMinutes);
    });
  }

  return (
    <div className={styles.schedule__container}>
      {Object.entries(lessonsByDay).map(([day, lessons]) => (
        <div key={day} className={styles.lesson__mainContainer}>
          <hr />
          <h2 className={styles.lesson__dayName}>{day}</h2>
          <hr />
          {lessons.map((lesson) => (
            <div key={lesson._id} className={styles.lesson__container}>
              <div className={styles.lesson__timePlace}>
                <p>
                  Время: {lesson.timeStart} - {lesson.timeEnd}
                </p>
                <p>Кабинет: {lesson.room}</p>
              </div>
              <div className={styles.lesson__mainDescription}>
                <p className={styles.lesson__subjectName}>{lesson.subject}</p>
                <div className={styles.lesson__info}>
                  <p>Преподаватель: {lesson.teacher}</p>
                  <p>Тип: {lesson.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
