import axios, { AxiosError } from "axios";
import { SignUpFormSchema } from "@/app/_lib/definitions";
import { REGISTER_USER } from "@/app/_helpers/consts";

export async function signup(formData: FormData) {
  try {
    const validatedFields = SignUpFormSchema.safeParse({
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const response = await axios.post(REGISTER_USER, {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    return {
      message: response.data.message,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        const backendErrors = error.response.data.message;
        return {
          errors: {
            general: backendErrors,
          },
        };
      }
      console.error("Произошла ошибка при регистрации:", error.message);
      return {
        errors: {
          general:
            "Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз.",
        },
      };
    }
  }
}
