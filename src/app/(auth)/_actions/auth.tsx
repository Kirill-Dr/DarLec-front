import axios from "axios";

export async function signup(formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  await axios.post("http://localhost:3000/api/auth/register", data);
}
