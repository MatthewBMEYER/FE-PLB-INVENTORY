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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import GoogleIcon from "../assets/google-color.svg";

export default function RegisterForm({ onRegister, setIsLogin, onLogin }) {
  const [form, setForm] = useState({
    nama_user: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({
    title: "",
    message: "",
    email: "",
    action: "", // 'login' or 'register'
  });

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

  // Handle Google Auth Response
  const handleGoogleAuthResponse = (res) => {
    console.log('Google Auth Response:', res.data);

    if (res.data.kode === 200) {
      // CASE 1: User sudah ada - LOGIN berhasil
      if (onLogin) {
        onLogin(res.data.data); // Auto login
      } else {
        // Show dialog bahwa user sudah ada
        setDialogData({
          title: "Akun Sudah Terdaftar",
          message: `Email ${res.data.data?.user?.email} sudah terdaftar. Anda akan diarahkan ke halaman login.`,
          email: res.data.data?.user?.email,
          action: "login"
        });
        setDialogOpen(true);
      }
    } else if (res.data.kode === 201) {
      // CASE 2: User baru - REGISTER berhasil
      if (onLogin) {
        onLogin(res.data.data); // Auto login setelah register
      } else {
        setDialogData({
          title: "Registrasi Berhasil",
          message: `Registrasi dengan Google berhasil! Email: ${res.data.data?.user?.email}`,
          email: res.data.data?.user?.email,
          action: "register"
        });
        setDialogOpen(true);
      }
    } else {
      // CASE 3: Error lainnya
      setError(res.data.message || "Terjadi kesalahan");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setGoogleLoading(true);
    setError("");

    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('Google User Info:', decoded);

      const res = await api.user.googleAuth({
        token: credentialResponse.credential,
        email: decoded.email,
        name: decoded.name,
        google_id: decoded.sub,
        picture: decoded.picture
      });

      handleGoogleAuthResponse(res);

    } catch (err) {
      console.error('Google auth error:', err);
      if (err.response?.data?.kode === 404) {
        setError("Akun belum terdaftar. Silakan daftar dengan email terlebih dahulu.");
      } else if (err.response?.data?.kode === 409) {
        setDialogData({
          title: "Email Sudah Terdaftar",
          message: `Email ${err.response.data.email} sudah terdaftar. Silakan login.`,
          email: err.response.data.email,
          action: "login"
        });
        setDialogOpen(true);
      } else {
        setError(err.response?.data?.message || 'Terjadi kesalahan pada server');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Auth Failed:", error);
    setError("Gagal autentikasi dengan Google. Silakan coba lagi.");
  };

  const handleDialogClose = (proceedToLogin = false) => {
    setDialogOpen(false);
    if (proceedToLogin || dialogData.action === "login") {
      setIsLogin(true);
    }
  };

  const CustomGoogleButton = ({ onClick }) => (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: "100%" }} onClick={onClick}>
      <img src={GoogleIcon} alt="Description" width={30} />
    </Box>
  );

  return (
    <>
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

        {/* Hidden Google Login for actual OAuth */}
        <Box sx={{ display: 'none' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap={false}
            theme="outline"
            size="large"
            text="signup_with"
            shape="rectangular"
            locale="en"
          />
        </Box>

        {/* Custom Google Button */}
        <CustomGoogleButton
          onClick={() => {
            const googleButton = document.querySelector('div[role="button"][aria-labelledby="button-label"]');
            if (googleButton) googleButton.click();
          }}
          disabled={googleLoading}
        />

        <Box justifyContent="center" sx={{ mt: 2 }}>
          <Link
            component="button"
            variant="body2"
            onClick={() => setIsLogin(true)}
            sx={{ cursor: "pointer" }}
          >
            Sudah punya akun? Login
          </Link>
        </Box>
      </Box>

      {/* Dialog untuk konfirmasi */}
      <Dialog
        open={dialogOpen}
        onClose={() => handleDialogClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogData.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogData.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {dialogData.action === "login" ? (
            <>
              <Button onClick={() => handleDialogClose(false)}>Tutup</Button>
              <Button onClick={() => handleDialogClose(true)} autoFocus>
                Ke Halaman Login
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => handleDialogClose(false)}>Lanjutkan</Button>
              <Button onClick={() => setIsLogin(true)} autoFocus>
                Login Sekarang
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}