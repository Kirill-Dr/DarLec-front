import { z } from "zod";

export const SignupFormSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Имя должно содержать не менее 2 символов." })
      .trim(),
    email: z
      .string()
      .email({
        message: "Пожалуйста, введите действительный адрес электронной почты.",
      })
      .trim(),
    password: z
      .string()
      .min(8, { message: "Пароль должен содержать не менее 8 символов" })
      .regex(/[a-zA-Z]/, {
        message: "Пароль должен содержать хотя бы одну букву",
      })
      .regex(/[0-9]/, { message: "Пароль должен содержать хотя бы одну цифру" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Пароль должен содержать хотя бы один специальный символ",
      })
      .trim(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  });

export type FormState =
  | {
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
      message?: string;
    }
  | undefined;
