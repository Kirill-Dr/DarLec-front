"use client";
import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_redux/store";
import { useEffect } from "react";
import { GET_HOMEWORK } from "@/app/_helpers/consts";
import { setHomework } from "@/app/_redux/features/homeworkSlice";
import { HomeworkComponent } from "@/app/_components/Homework/Homework";
import { useRouter } from "next/navigation";
import { HeaderComponent } from "@/app/_components/Header/Header";
import Cookies from "js-cookie";
import ScrollToTop from "@/app/_components/ScrollToTop/ScrollToTop";
import { requestWithToken } from "@/app/(auth)/_actions/refreshToken";

export default function HomeworkPage() {
  const router = useRouter();
  const homework = useSelector((state: RootState) => state.homework.homework);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Cookies.get("access_token")) {
      const fetchHomework = async () => {
        const response = await requestWithToken(GET_HOMEWORK);
        dispatch(setHomework(response.data));
      };
      fetchHomework();
    } else {
      router.push("/signin");
    }
  }, [dispatch, router]);

  return (
    <>
      <HeaderComponent />
      <section className={styles.homework__container}>
        <ScrollToTop />
        <h1 className={styles.homework__title}>Домашняя работа</h1>
        <HomeworkComponent homework={homework} />
      </section>
    </>
  );
}
