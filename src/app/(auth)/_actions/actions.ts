import axios, { AxiosError } from "axios";
import { SignupFormSchema } from "@/app/_lib/validation";
import { LOGIN_USER, REGISTER_USER } from "@/app/_helpers/consts";
import Cookies from "js-cookie";

export async function signup(formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  try {
    const validatedFields = SignupFormSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const response = await axios.post(REGISTER_USER, data);

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

export async function signin(formData: FormData) {
  try {
    const response = await axios.post(LOGIN_USER, {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    if (response.data) {
      Cookies.set("access_token", response.data.access_token);
      Cookies.set("refresh_token", response.data.refresh_token);
    }
    return {
      data: response.data,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        const backendErrors = error.response.data.message;
        return {
          errors: {
            general: backendErrors,
          },
        };
      }
      console.error("Произошла ошибка при авторизации:", error.message);
      return {
        errors: {
          general:
            "Произошла ошибка при авторизации. Пожалуйста, попробуйте еще раз.",
        },
      };
    }
  }
}

export async function logout() {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
}
