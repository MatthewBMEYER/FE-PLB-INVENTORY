import React, { useState } from "react";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  CssBaseline,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "./Login.css";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (data) => {
    alert(`Login sukses\nEmail: ${data.user.email}`);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("roleMenus", JSON.stringify(data.roleMenus));
    console.log("Respon Login : ",data);
    const firstDirection = data?.roleMenus?.[0]?.child?.[0]?.direction || "/dashboard";
    navigate(firstDirection);
  };

  const handleRegister = (formData) => {
    alert(
      `Registering\nName: ${formData.nama_user}\nEmail: ${formData.email}\nRole: ${formData.role}`
    );
    setIsLogin(true);
  };

  return (
    <>
      <CssBaseline />
      <div className="login-page">
        <div className="login-bg" />
        <div className="login-content">
          <Container maxWidth="xs">
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 3,
                backdropFilter: "blur(4px)",
                backgroundColor: "rgba(255, 255, 255, 0.85)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                  {isLogin ? "IT INVENTORY" : "Register"}
                </Typography>
              </Box>

              {isLogin ? (
                <LoginForm onLogin={handleLogin} setIsLogin={setIsLogin} />
              ) : (
                <RegisterForm onRegister={handleRegister} setIsLogin={setIsLogin} />
              )}
            </Paper>
          </Container>
        </div>
      </div>
    </>
  );
}
