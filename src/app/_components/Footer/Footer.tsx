import React from "react";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.company__name}>DarLec &copy; {currentYear}</div>
      <div className={styles.company__contact}>
        <div className={styles.company__email}>
          Электронная почта:{" "}
          <a href="mailto:daright6@gmail.com">daright6@gmail.com</a>
        </div>
        <div className={styles.line}>|</div>{" "}
        <div>Номер телефон: +996 502 777 027</div>
      </div>
    </footer>
  );
};
