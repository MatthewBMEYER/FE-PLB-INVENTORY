import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:801", // ganti sesuai port backend 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
