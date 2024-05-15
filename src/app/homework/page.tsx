"use client";
import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_redux/store";
import { useEffect } from "react";
import axios from "axios";
import { GET_HOMEWORK } from "@/app/_helpers/consts";
import { setHomework } from "@/app/_redux/features/homeworkSlice";
import { HomeworkComponent } from "@/app/_components/Homework/Homework";
import { ScrollToTop } from "@/app/_components/ScrollToTop/ScrollToTop";
import { redirect } from "next/navigation";

export default function HomeworkPage() {
  const homework = useSelector((state: RootState) => state.homework.homework);
  const dispatch = useDispatch();

  useEffect(() => {
    redirect("/signUp");
  }, []);

  useEffect(() => {
    const fetchHomework = async () => {
      const response = await axios.get(GET_HOMEWORK);
      dispatch(setHomework(response.data));
    };

    fetchHomework();
  }, [dispatch]);

  return (
    <section className={styles.homework__container}>
      <ScrollToTop />
      <h1 className={styles.homework__title}>Домашняя работа</h1>
      <HomeworkComponent homework={homework} />
    </section>
  );
}
