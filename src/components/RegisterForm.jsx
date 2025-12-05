import React, { useState } from "react";
import api from "../api/api";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Grid,
  Link,
  IconButton,
  Divider,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import GoogleIcon from "../assets/google-color.svg"

export default function RegisterForm({ onRegister, setIsLogin }) {
  const [form, setForm] = useState({
    nama_user: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Password tidak cocok");
      return;
    }

    if (form.password.length < 6) {
      setError("Password minimal 6 karakter");
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
        alert("Registrasi berhasil. Silakan login.");
        onRegister?.(form);
        setIsLogin(true);
      } else {
        setError(res.data.message || "Registrasi gagal");
      }
    } catch (error) {
      console.error("Register error:", error);
      const fallbackMessage = "Terjadi kesalahan saat registrasi.";
      const serverMessage =
        error?.response?.data?.message ??
        (typeof error === "string" ? error : fallbackMessage);
      setError(serverMessage);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Decode the JWT token
      const decoded = jwtDecode(credentialResponse.credential);

      // Call backend with Google data
      const res = await api.user.googleAuth({
        token: credentialResponse.credential,
        email: decoded.email,
        name: decoded.name,
        google_id: decoded.sub,
        picture: decoded.picture
      });

      if (res.data.kode === 200 || res.data.kode === 201) {
        // Success - user logged in or registered
        onLogin(res.data.data);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error('Google auth error:', err);
      setError(err.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Registration Failed:", error);
    setError("Gagal registrasi dengan Google. Silakan coba lagi.");
  };

  // Custom Google Registration Button
  const CustomGoogleButton = ({ onClick }) => (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: "100%" }} onClick={onClick}>
      <img src={GoogleIcon} alt="Description" width={30} />
    </Box>
  );

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

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
        sx={{ mt: 3, mb: 2, py: 1.5 }}
      >
        Register
      </Button>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" color="text.secondary">
          or sign up with
        </Typography>
      </Divider>

      {/* Custom Google Button */}
      <Box sx={{ mt: 3, position: 'relative' }}>
        <CustomGoogleButton
          onClick={() => {
            // Trigger the hidden GoogleLogin button
            const googleButton = document.querySelector('div[role="button"][aria-labelledby="button-label"]');
            if (googleButton) googleButton.click();
          }}
          disabled={googleLoading}
        />
        {/* Hidden Google Login trigger */}
        <Box sx={{ display: 'none' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap={false}
            theme="outline"
            size="large"
            type="icon"
            shape="rectangular"
            locale="en"
            ux_mode="popup"
          />
        </Box>
      </Box>

      <Box justifyContent="center" sx={{ mt: 2 }}>
        <Link
          component="button"
          variant="body2"
          onClick={() => setIsLogin(true)}
          sx={{ cursor: "pointer" }}
        >
          Login
        </Link>

      </Box>
    </Box>
  );
}