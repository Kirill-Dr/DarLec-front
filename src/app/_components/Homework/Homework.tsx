import React from "react";
import styles from "./Homework.module.css";
import { Homework, HomeworkProps } from "@/app/_interfaces/Homework";

export const HomeworkComponent: React.FC<HomeworkProps> = ({ homework }) => {
  const homeworkBySubject = homework.reduce<Record<string, Homework[]>>(
    (acc, homework) => {
      (acc[homework.subject] = acc[homework.subject] || []).push(homework);
      return acc;
    },
    {},
  );

  return (
    <div className={styles.homework__container}>
      {Object.entries(homeworkBySubject).map(([subject, homework]) => (
        <div key={subject} className={styles.homework__mainContainer}>
          <hr />
          <h2 className={styles.homework__subjectName}>{subject}</h2>
          <hr />
          {homework.map((homework) => (
            <div key={homework._id} className={styles.task__container}>
              <p className={styles.task__info}>{homework.task}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
