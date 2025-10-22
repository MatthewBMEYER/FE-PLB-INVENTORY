// src/api/api.js
import axios from "axios";

// ✅ Buat instance axios utama
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// ✅ Tambahkan interceptor (opsional, bisa nambah token otomatis)
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// ✅ Grup API
const api = {
  user: {
    login: (data) => axiosInstance.post("/user/login", data),
    register: (data) => axiosInstance.post("/user/register", data),
    resetPassword: (data) => axiosInstance.post("/user/resetPassword", data),
    forgotPassword: (email) => axiosInstance.post("/user/forgotPassword", { email }),
    list: () => axiosInstance.get("/user/list"),
    deleteUser: (data) => axiosInstance.delete("/user/deleteUser", data),
  },
  browse: {
    search: (params) => axiosInstance.get(`/browse/laporan/search?${params}`),
  },

  // kamu bisa tambah grup lain nanti, misal:
  // produk: {...},
  // laporan: {...},
};

export default api;
