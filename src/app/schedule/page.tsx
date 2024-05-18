"use client";
import React, { useEffect } from "react";
import styles from "./page.module.css";
import axios from "axios";
import { ScheduleComponent } from "@/app/_components/Schedule/Schedule";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_redux/store";
import { setLessons } from "@/app/_redux/features/scheduleSlice";
import { GET_LESSONS } from "@/app/_helpers/consts";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { HeaderComponent } from "@/app/_components/Header/Header";
import ScrollToTop from "@/app/_components/ScrollToTop/ScrollToTop";
import { requestWithToken } from "@/app/(auth)/_actions/refreshToken";

export default function SchedulePage() {
  const router = useRouter();
  const lessons = useSelector((state: RootState) => state.schedule.lessons);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Cookies.get("access_token")) {
      const fetchLessons = async () => {
        const response = await requestWithToken(GET_LESSONS);
        dispatch(setLessons(response.data));
      };
      fetchLessons();
    } else {
      console.log("Пользователь не авторизован");
      router.push("/signin");
    }
  }, [dispatch, router]);

  return (
    <>
      <HeaderComponent />
      <section className={styles.schedule__container}>
        <ScrollToTop />
        <h1 className={styles.schedule__title}>Расписание</h1>
        <ScheduleComponent lessons={lessons} />
      </section>
    </>
  );
}
