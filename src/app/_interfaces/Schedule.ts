export interface ScheduleProps {
  lessons: Lesson[];
}

export interface Lesson {
  _id: string;
  day: string;
  subject: string;
  timeStart: string;
  timeEnd: string;
  teacher: string;
  type: string;
  room: string;
}
