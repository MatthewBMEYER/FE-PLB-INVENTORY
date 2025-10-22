import React, { useState } from "react";
import api from "../api/api";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


export default function RegisterForm({ onRegister, setIsLogin }) {
  const [form, setForm] = useState({
    nama_user: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Password tidak cocok");
      return;
    }

    try {
      const { nama_user, email, password } = form;

      const res = await api.user.register({
        nama_user,
        email,
        password,
      });

      if (res.data.kode === 200) {
        alert("Registrasi sedang diproses.");
        onRegister?.(form);
        setIsLogin(true); // Go to login
      } else {
        alert(res.data.message || "Registrasi gagal");
      }
    } catch (error) {
      console.error("Register error:", error);

      const fallbackMessage = "Registrasi berhasil.";
      const serverMessage =
        error?.response?.data?.message ??
        (typeof error === "string" ? error : fallbackMessage);

      alert(serverMessage);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Full Name"
        name="nama_user"
        type="name"
        value={form.nama_user}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={form.password}
        onChange={handleChange}
        slotProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Confirm Password"
        name="confirmPassword"
        type={showPassword ? "text" : "password"}
        value={form.confirmPassword}
        onChange={handleChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 1 }}
      >
        Register
      </Button>

      <Button fullWidth variant="outlined" onClick={() => setIsLogin(true)}>
        Back to Login
      </Button>
    </Box>
  );
}