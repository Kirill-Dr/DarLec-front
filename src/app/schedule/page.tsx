"use client";
import { useEffect } from "react";
import styles from "./page.module.css";
import axios from "axios";
import { ScheduleComponent } from "@/app/_components/Schedule/Schedule";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_redux/store";
import { setLessons } from "@/app/_redux/features/scheduleSlice";
import { GET_LESSONS } from "@/app/_helpers/consts";

export default function SchedulePage() {
  const lessons = useSelector((state: RootState) => state.schedule.lessons);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLessons = async () => {
      const response = await axios.get(GET_LESSONS);
      dispatch(setLessons(response.data));
    };

    fetchLessons();
  }, [dispatch]);

  return (
    <div className={styles.schedule__container}>
      <h1 className={styles.schedule__title}>Расписание</h1>
      <ScheduleComponent lessons={lessons} />
    </div>
  );
}
