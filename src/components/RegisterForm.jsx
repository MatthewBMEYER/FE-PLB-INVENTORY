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

  // State for Google registration flow
  const [googleDialogOpen, setGoogleDialogOpen] = useState(false);
  const [googleUserData, setGoogleUserData] = useState({
    email: "",
    name: "",
    google_id: "",
    token: "",
    picture: ""
  });
  const [googlePassword, setGooglePassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [googlePasswordError, setGooglePasswordError] = useState("");
  const [submittingGoogle, setSubmittingGoogle] = useState(false);

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
    setGoogleLoading(true);
    setError("");

    try {
      const decoded = jwtDecode(credentialResponse.credential);

      // Store Google data and show password dialog
      setGoogleUserData({
        email: decoded.email,
        name: decoded.name,
        google_id: decoded.sub,
        token: credentialResponse.credential,
        picture: decoded.picture
      });

      // Show password dialog immediately
      setGoogleDialogOpen(true);

    } catch (err) {
      console.error('Google decode error:', err);
      setError('Gagal memproses data Google');
    } finally {
      setGoogleLoading(false);
    }
  };

  // Handle Google password submission
  const handleGooglePasswordSubmit = async () => {
    // Validate password
    if (!googlePassword.password || !googlePassword.confirmPassword) {
      setGooglePasswordError("Password dan konfirmasi password diperlukan");
      return;
    }

    if (googlePassword.password !== googlePassword.confirmPassword) {
      setGooglePasswordError("Password tidak cocok");
      return;
    }

    setSubmittingGoogle(true);
    setGooglePasswordError("");

    try {
      // Call GOOGLE REGISTER endpoint
      const res = await api.user.googleRegister({
        token: googleUserData.token,
        email: googleUserData.email,
        name: googleUserData.name,
        google_id: googleUserData.google_id,
        picture: googleUserData.picture,
        password: googlePassword.password,
        confirmPassword: googlePassword.confirmPassword
      });

      console.log('Google Register Response:', res.data);

      if (res.data.kode === 201) {
        // Registration successful (but inactive)
        setGoogleDialogOpen(false);
        alert(`Registrasi dengan Google berhasil!\n\nAkun ${googleUserData.email} telah dibuat.\n\nSilakan hubungi administrator untuk mengaktifkan akun dan menetapkan role.`);

        // Redirect to login page
        setIsLogin(true);
      } else if (res.data.kode === 409) {
        // Email or Google account already exists
        setGooglePasswordError(res.data.message);

        // Auto close dialog and suggest login after 2 seconds
        setTimeout(() => {
          setGoogleDialogOpen(false);
          alert('Akun sudah terdaftar. Silakan login.');
          setIsLogin(true);
        }, 2000);
      } else {
        setGooglePasswordError(res.data.message || "Registrasi gagal");
      }

    } catch (err) {
      console.error('Google register error:', err);
      setGooglePasswordError(err.response?.data?.message || 'Terjadi kesalahan saat registrasi.');
    } finally {
      setSubmittingGoogle(false);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Auth Failed:", error);
    setError("Gagal autentikasi dengan Google. Silakan coba lagi.");
  };

  const CustomGoogleButton = ({ onClick }) => (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: "100%" }} onClick={onClick}>
      <IconButton>
        <img src={GoogleIcon} alt="Description" width={30} />
      </IconButton>
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
        <Box display="flex" justifyContent="center" mb={2}>
          <CustomGoogleButton
            onClick={() => {
              const googleButton = document.querySelector('div[role="button"][aria-labelledby="button-label"]');
              if (googleButton) googleButton.click();
            }}
          />
        </Box>

        <Box justifyContent="center" sx={{ mt: 2, textAlign: 'center' }}>
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

      {/* Dialog untuk Set Password Google */}
      <Dialog
        open={googleDialogOpen}
        onClose={() => !submittingGoogle && setGoogleDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Atur Password untuk Akun Google</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Anda mendaftar dengan Google menggunakan email: <strong>{googleUserData.email}</strong>
            <br /><br />
            Silakan atur password untuk login manual nanti.
          </DialogContentText>

          {googlePasswordError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {googlePasswordError}
            </Alert>
          )}

          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={googlePassword.password}
            onChange={(e) => setGooglePassword({ ...googlePassword, password: e.target.value })}
            disabled={submittingGoogle}
            slotProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={submittingGoogle}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            label="Konfirmasi Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={googlePassword.confirmPassword}
            onChange={(e) => setGooglePassword({ ...googlePassword, confirmPassword: e.target.value })}
            disabled={submittingGoogle}
            sx={{ mt: 2 }}
          />

          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="body2">
              <strong>Catatan:</strong> Setelah registrasi, akun Anda perlu diaktivasi oleh administrator.
              Silakan hubungi admin untuk mengaktifkan akun dan menetapkan role.
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setGoogleDialogOpen(false)}
            disabled={submittingGoogle}
          >
            Batal
          </Button>
          <Button
            onClick={handleGooglePasswordSubmit}
            variant="contained"
            disabled={submittingGoogle}
          >
            {submittingGoogle ? <CircularProgress size={24} /> : "Daftar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}