export interface HomeworkProps {
  homework: Homework[];
}

export interface Homework {
  _id: string;
  subject: string;
  task: string;
}
