import React from "react";
import styles from "./BurgerButton.module.css";

interface BurgerButtonProps {
  isOpened: boolean;
}

const BurgerButton: React.FC<BurgerButtonProps> = ({ isOpened }) => {
  return (
    <div className={styles.burger}>
      <div className={`${styles.line} ${isOpened ? styles.open : ""}`} />
      <div className={`${styles.line} ${isOpened ? styles.open : ""}`} />
      <div className={`${styles.line} ${isOpened ? styles.open : ""}`} />
    </div>
  );
};

export default BurgerButton;
