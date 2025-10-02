import React, { useEffect, useState } from "react";
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
import RegistrasiForm from "../components/RegisterForm"
import "./Login.css";

export default function AuthPage() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);


    const handleLogin = (data) => {
        alert(`Login sukses\nEmail: ${data.user.email}`);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("roleMenus", JSON.stringify([])); 
        navigate("/dashboard");
    };

    const handleRegister = (formData) => {
        alert(
            `Registering\nName: ${formData.nama_user}\nEmail: ${formData.email}\nRole: ${formData.role}`
        );
        setIsLogin(true);
    };

    useEffect(()=>{
        setIsLogin(true)
    },[])

    return (
        <>
            <CssBaseline />
            <div className="login-page">
                <div className="login-bg" >
                    <div className="center-screen">
                        <Container maxWidth="xs">
                            <Paper
                                elevation={6}
                                sx={{
                                    p: 4,
                                    borderRadius: 3,
                                    backdropFilter: "blur(4px)",
                                    backgroundColor: "rgba(255, 255, 255, 0.93)",
                                    width: 400,
                                    marginTop:30
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
                                        {isLogin ? "Login PLB INVENTORY" : "Register PLB INVENTORY"}
                                    </Typography>
                                </Box>

                                {isLogin ? (
                                    <LoginForm onLogin={handleLogin} setIsLogin={setIsLogin} />
                                ) : (
                                    <RegistrasiForm onRegister={handleRegister} setIsLogin={setIsLogin} />
                                )}
                            </Paper>
                        </Container>

                    </div>
                </div>
            </div>
        </>
    );
}
