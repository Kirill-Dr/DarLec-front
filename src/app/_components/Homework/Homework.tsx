import React from "react";
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
    <div>
      {Object.entries(homeworkBySubject).map(([subject, homework]) => (
        <div key={subject}>
          <hr />
          <h2>{subject}</h2>
          <hr />
          {homework.map((homework) => (
            <div key={homework._id}>
              <div>{homework.task}</div>
              <div>{homework.date}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
