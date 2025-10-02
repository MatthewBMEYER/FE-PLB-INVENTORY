import api from "./axios";

// Register
export async function registerUser(data) {
  return await api.post("/user/register", data);
}

// Login
export async function loginUser(data) {
  const res = await api.post("/user/login", data);
  if (res.data.data?.token) {
    localStorage.setItem("token", res.data.data.token);
  }
  return res.data;
}

// Lupa Password
export async function forgetPassword(email) {
  return await api.post("/user/forget-password", { email });
}

// Reset Password
export async function resetPassword(token, newPassword) {
  return await api.post(`/user/reset-password/${token}`, { newPassword });
}
