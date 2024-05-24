import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { REFRESH_TOKEN } from "@/app/_helpers/consts";

async function refreshToken() {
  try {
    const { data } = await axios.post(REFRESH_TOKEN, {
      refreshToken: Cookies.get("refresh_token"),
    });
    Cookies.set("access_token", data.access_token);
    Cookies.set("refresh_token", data.refresh_token);
  } catch (error) {
    console.error("Ошибка при обновлении токена:", error);
  }
}

async function requestWithToken(url: string, options: AxiosRequestConfig = {}) {
  try {
    const response = await axios(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        await refreshToken();
        return requestWithToken(url, options);
      }
    }
    throw error;
  }
}

export { refreshToken, requestWithToken };
